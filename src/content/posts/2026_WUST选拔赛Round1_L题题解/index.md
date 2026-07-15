---
title: "2026_WUST选拔赛Round1_L题题解"
published: 2026-06-15
description: "2026_WUST选拔赛Round1_L题题解"
tags: ["算法", "题解"]
category: "算法竞赛"
draft: false
---
# 2026 WUST选拔赛Round1 L题题解

原题链接：[Nowcoder](https://ac.nowcoder.com/acm/problem/16033)

## 题意：

在 $1$ 到 $n$ 上有 $n$ 个位置，每个位置放置了一个弹簧，弹簧能将弹球弹到固定的点 $a[i]$ $(1 \leq a[i] \leq n)$ 上。

接下来要进行 $m$ 个操作：在第 $i$ $(1 \leq i \leq m)$ 个操作中，你需要放置一个拥有无限动力的弹球在 $b[i] \oplus c[i - 1]$ 处，并回答在 $b[i] \oplus c[i - 1]$ 处的弹球个数 $c[i]$ 。

注意：操作的顺序为：先放入一个弹球，询问当前位置的弹球数量，再所有弹球沿边移动一步。

已知 $c[0] = 0$ 。给定位置个数 $n$ $(1 \leq n \leq 5e5)$ ，操作数 $m$ $(1 \leq m \leq 5e5)$ 和数组 $a$， $b$。保证所有弹球都会被放置在 $pos$ $(1 \leq pos \leq n)$ 中。

## 思路：

1. 转化题意
   
   由于每个位置的弹球都会在一次操作中从位置 $x$ 被移到 $a[x]$，因此可以将每一个位置看成一个点，并连接一条有向边，形成了由若干个基环树组成的函数图。因此，此题可以转化为：
   在由若干个基环树组成的函数图上，支持动态加入弹球，并在线查询某个时刻某个点上的弹球数量。

2. 非环点
   
   对于不在环上的点，弹球会不断沿边移动，直到第一次到达**唯一的，且在其所在基环树的环上的点**为止。对于任意一个基环树来说，每一个非环点都在以**某个唯一的，且在其所在基环树的环上的点**为根的树上。因此，我们可以建立反图，利用树的结构去维护位置。

   接下来需要维护非环点上弹球的位置。设在第 $t$ 次操作中在非环点 $u$ 放入弹球，在第 $i$ $(t \leq i \leq m)$ 次操作中询问非环点 $v$ ，且这个弹球在点 $v$ 上。利用树的结构，我们可以知道弹球从 $u$ 移动到点 $v$ 所需要的时间为点 $u$ 在树上的深度减去 $v$ 的在树上的深度，设 $dep[x]$ 表示点 $x$ 的深度，即有：$i - t = dep[u] - dep[v]$，变形可以得到：
   $$i + dep[v] = t + dep[u]$$

   另外，点 $u$ 一定位于以点 $v$ 为根的子树中。因此，不仅要满足 $i + dep[v] = t + dep[u]$ 的时间条件，也要满足路径条件。可以对每一个树都维护一个 $dfs$ 序，设点 $tin[x]$ 和 $tout[x]$ 分别为点 $x$ 的 $dfs$ 进入时间和点 $x$ 子树内最大的 $dfs$ 进入时间，则需满足：$$tin[v] \leq tin[u] \leq tout[v]$$

   因此，查询非环点 $v$ 时，只需统计满足$i + dep[v] = t + dep[u]$且$tin[u]$ 在 $[tin[v], tout[v]]$ 之间的历史插入点 $u$ 。因此，可以按照 $key$ $(key = t + dep[u])$ 的值进行分类，对于每一个 $key$ 来说，使用对应的平衡树维护其插入点的$dfs$序，并统计 $[tin[v], tout[v]]$ 之间的数目即可。我们可以使用```unordered_map<int, ordered_set<array <int, 2> >```进行维护。其中 $key = t + dep[u]$ ，```ordered_set```中存储 ```{tin[u], t}``` ，防止同一个点多次插入后仍计算为同一个点。

3. 环点
   
   对于环上的点，弹球会不断沿环上的边移动。设在第 $t$ 次操作中在环点 $u$ 放入弹球，环点 $u$ 所在的环的长度为 $len$ ，环点编号为 $pos_i$ 。则在第 $T$ $(t \leq T \leq m)$ 次操作中，弹球会移动到编号为 $pos[v]$ $(pos[v] \equiv pos[u] + (T - t) \pmod {len})$ 上，变形有：
   $$pos[u] - t \equiv pos[v] - T \pmod {len}$$

   因此，与非环点类似， $pos[u] - t$ 仍然是一个不变量 $c\_id$ ，利用简单数组统计有相同 $c\_id$ 的点的数量即可。
   
   除此之外，环点还需要维护弹球从非环点走到环上的弹球数量。对于每一个在非环点的弹球，可以利用其树的深度来快速算出其进入环点的时间，可以在对应的时间把这些点当作环点加入环内即可。

## 代码：

``` c++
#include <bits/stdc++.h>
#include <bits/extc++.h>
using namespace std;
using namespace __gnu_pbds;
#define int long long
template <typename T>
using ordered_set = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;
using arr2 = array <int, 2>;

void solve ()
{
    int n;
    cin >> n;
    vector <int> a(n + 1), ind(n + 1);
    vector <vector <int> > rev(n + 1);

    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        ind[a[i]]++;
        rev[a[i]].push_back(i);
    }

    // 一.建基环树
    // 1.topo判环
    vector <int> removed(n + 1);
    queue <int> q;
    for (int i = 1; i <= n; i++) {
        if (ind[i] == 0) {
            q.push(i);
        }
    }

    while (!q.empty()) {
        auto u = q.front();
        q.pop();
        removed[u] = true;
        int v = a[u];
        if (--ind[v] == 0) q.push(v);
    }

    // 2.建环
    vector <vector <int> > cycle;
    vector <int> vis(n + 1, 0);
    int id = 0;
    for (int i = 1; i <= n; i++) {
        if (removed[i] || vis[i]) continue;
        vector <int> cyc;
        int u = i;
        while (!vis[u]) {
            vis[u] = 1;
            cyc.push_back(u);
            u = a[u];
        }
        cycle.push_back(cyc);
    }

    // 3.初始化树的信息
    vector <int> comp(n + 1), pos(n + 1), dep(n + 1), root(n + 1);
    int sum_cyc = cycle.size();

    for (int id = 0; id < sum_cyc; id++) {
        for (int i = 0; i < cycle[id].size(); i++) {
            int u = cycle[id][i];
            comp[u] = id;
            pos[u] = i;
            dep[u] = 0;
            root[u] = u;
        }
    }

    // 4.建反树
    vector <vector <int> > e(n + 1);
    for (int u = 1; u <= n; u++) {
        for (auto v : rev[u]) {
            if (removed[v]) {
                e[u].push_back(v);
            }
        }
    }

    // 5.求dfs序
    vector <int> tin(n + 1), tout(n + 1);
    int time = 0;

    auto dfs = [&] (auto self, int u) -> void {
        tin[u] = ++time;
        for (auto v : e[u]) {
            comp[v] = comp[u];
            root[v] = root[u];
            dep[v] = dep[u] + 1;
            self(self, v);
        }
        tout[u] = time;
    };

    for (auto &cyc : cycle) {
        for (auto r : cyc) {
            dfs(dfs, r);
        }
    }

    // 二.计算答案

    // 1.初始化
    int m;
    cin >> m;
    vector <int> len(sum_cyc);
    vector <vector <int> > cyc_info(sum_cyc);
    for (int id = 0; id < sum_cyc; id++) {
        len[id] = cycle[id].size();
        cyc_info[id].assign(len[id], 0);
    }

    vector <vector <arr2> > update(m + 1);
    unordered_map <int, ordered_set<arr2> > mp;
    mp.reserve(m * 2 + 10);

    int pre = 0;

    for (int i = 1; i <= m; i++) {
        for (auto [id, c_id] : update[i]) {
            cyc_info[id][c_id]++;
        }
        int x;
        cin >> x;
        x = (x ^ pre);

        // 2.插入
        if (!removed[x]) {
            int id = comp[x];
            int c_id = ((pos[x] - i) % len[id] + len[id]) % len[id];
            cyc_info[id][c_id]++;
        }else {
            int key = i + dep[x];
            mp[key].insert({tin[x], i});
            int T = i + dep[x];
            if (T <= m) {
                int id = comp[x];
                int c_id = ((pos[root[x]] - T) % len[id] + len[id]) % len[id];
                update[T].push_back({id, c_id});
            }
        }

        // 3.查询
        int res = 0;
        if (!removed[x]) {
            int id = comp[x];
            int c_id = ((pos[x] - i) % len[id] + len[id]) % len[id];
            res = cyc_info[id][c_id];
        }else {
            int key = i + dep[x];
            auto it = mp.find(key);
            if (it != mp.end()) {
                auto &st = it->second;
                res = st.order_of_key({tout[x] + 1, -1}) - st.order_of_key({tin[x], -1});
            }
        }

        cout << res << '\n';
        pre = res;
    }
}

int32_t main ()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
} 
```


