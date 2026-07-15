---
title: "华中农业大学第十五届程序设计竞赛游记及部分题解"
published: 2026-04-06
description: "记录我参加华中农业大学第十五届程序设计竞赛的经历，以及部分题目的题解和代码。"
image: "./cover.jpg"
tags: ["博客", "算法", "竞赛"]
category: "算法竞赛"
draft: false
---
# 华中农业大学第十五届程序设计竞赛游记及部分题解

## 游记

今年第二场线下比赛，赛前几天一直晕晕的，虽然但是，最后还是以六题拿了铜牌，但之后也要加强一些算法的训练了，有些算法的不熟悉导致了很多题目看着没思路，赛后发现实际上思路其实并不是特别困难。赛时快速切了I，D两道签到后，就被E题卡死，直到封榜后没招了，E题写了一位一位的向上模拟侥幸通过~~（实际上是因为模拟写假了且在第一步特判时实际上就把题目写完了所以侥幸过了）~~。在过E前，过了G，F两题，G因为自己迟迟没有过E心态爆炸而wa了6发，F看出二叉树遍历后写得还算顺利。过了E之后，就去写了L，感觉L还算简单，感觉题解写复杂了。
剩下能写的B和J感觉是因为自己对状压dp和st倍增的不熟悉而没有能写的思路，C看没多少人过也没细看，实际上思路还算清晰吧，感觉这次比赛有些可惜。之后得加训了~~（上次就说要加训来着）~~。

## 题解

### I

#### 题意

要买$n$杯奶茶，买一杯需要$a$元，买两杯需要$b$元，问最少需要多少钱能恰好买到$n$杯奶茶？

#### 代码

``` c++
void solve ()
{
	i64 n, a, b;
	cin >> n >> a >> b;
	if (2 * a <= b) {
		i64 ans = n * a;
		cout << ans << '\n';
	}else {
		i64 t = n / 2 * b;
		if (n & 1) {
			t += a;
		}
		cout << t << '\n';
	}
}
```

### D

#### 题意

给定整数$c$ $(2 \leq c \leq 1e9)$，需要找到两个正整数$a$和$b$,满足$a + b == c$，且使$lcm(a, b)$最大。

#### 思路

对于奇数，直接取$\lfloor n / 2 \rfloor$和$\lceil n / 2 \rceil$即可。
对于偶数，在$n / 2$的基础上往下，往上找到$lcm(l, r) == l \times r$的数即可。

#### 代码

``` c++
void solve ()
{
	i64 n;
	cin >> n;
	if (n & 1) {
		i64 t1 = n / 2;
		i64 t2 = n - n / 2;
		i64 ans = t1 * t2;
		cout << ans << '\n';
	}else {
		i64 l = n / 2, r = n / 2;
		while (lcm(l, r) != l * r) {
			l--;
			r++;
		}
		i64 ans = lcm(l, r);
		cout << ans << '\n';
	}
}
```

### G

#### 题意

给定$n$个魔法飞弹，第$i$枚飞弹对应第$i$个哥布林，给定每个飞弹的穿透力$a_i$和伤害$c_i$，和每个哥布林的防御力$b_i$。当且仅当$a_i \geq b_i$时飞弹才会对哥布林造成伤害。现在有$q$次独立的询问，每一次你有一次可以将任意一枚飞弹的穿透力修改为$X$的机会，求每一次最多能对哥布林造成多少总伤害？

#### 思路

我们可以预先处理出不修改穿透力的总伤害，再在剩余的未能造成伤害的飞弹里面先按需要的穿透力，即哥布林的防御力排序，再维护一个前缀数组，能够快速求出能把一个穿透力修改为$X$所能多造成的伤害。在处理询问时，仅需在前缀数组中二分查找即可。

时间复杂度：$O((n + q)\log n)$。

#### 代码

``` c++
void solve ()
{
	int n, q;
	cin >> n >> q;
	vector <array <i64, 3> > v(n + 1);
	for (int i = 1; i <= n; i++) {
		cin >> v[i][0];
	}
	for (int i = 1; i <= n; i++) {
		cin >> v[i][1];
	}
	for (int i = 1; i <= n; i++) {
		cin >> v[i][2];
	}
	
	i64 res = 0;
	vector <array <i64, 2> > a;
	a.reserve(n + 1);
	for (int i = 1; i <= n; i++) {
		if (v[i][0] >= v[i][1]) {
			res += v[i][2];
		}else {
			a.push_back({v[i][1], v[i][2]});
		}
	}
	
	sort(a.begin(), a.end(), [] (auto aa, auto bb) {
		if (aa[0] != bb[0]) {
			return aa[0] < bb[0];
		}else {
			return aa[1] > bb[1];
		}
	});
	
	i64 m = a.size();
	vector <i64> pre(m + 1);
	if (!a.empty()) pre[0] = a[0][1];
	for (int i = 1; i < m; i++) {
		pre[i] = max(pre[i - 1], a[i][1]);
	}
    
	while (q--) {
		i64 t;
		cin >> t;
		if (a.empty()) {
			cout << res << '\n';
			continue;
		}
		if (!a.empty() && t < a[0][0]) {
			cout << res << '\n';
			continue;
		}
		int l = 0, r = m - 1;
		while (l <= r) {
			int mid = (l + r) / 2;
			if (a[mid][0] <= t) {
				l = mid + 1;
			}else {
				r = mid - 1;
			}
		}
		cout << res + pre[r] << '\n';
	}
}
```

### F   

#### 题意

给定一个合法的括号序列$s$，按照左括号的顺序对所有括号对进行从$1$到$n$的编号，对于编号为$p$的括号对，若其左括号后仍为左括号，将下一个左括号的编号$l$作为$p$的左孩子，若其右括号后为左括号，将下一个左括号的编号$r$作为$p$的右孩子。现给出二叉树结构，构造出原来的合法括号序列$s$。

#### 思路

手玩样例后不难发现，对二叉树进行先序遍历即可。
时间复杂度：$O(n)$。

#### 代码

``` c++
void solve ()
{
	int n;
	cin >> n;
	vector <array <int, 2> > v(n + 1);
	for (int i = 1; i <= n; i++) {
		cin >> v[i][0] >> v[i][1];
	}

	vector <int> ans;
	auto dfs = [&] (auto self, int fa, int u) -> void {
		ans.push_back(u);
		if (v[u][0] != 0) self(self, u, v[u][0]);
		ans.push_back(u);
		if (v[u][1] != 0) self(self, u, v[u][1]);
	};
	dfs(dfs, 0, 1);
	
	vector <int> cnt(n + 1);
	string s;
	for (auto x : ans) {
		if (cnt[x] == 0) {
			s.push_back('(');
			cnt[x]++;
		}else {
			s.push_back(')');
		}
	}
	
	cout << s << '\n';
}
```

### E

#### 题意

给定一个正整数$x$ $(1 \leq x \leq 1e12)$，询问是否能找到另一个正整数$k$，使得$x \times k$在十进制中每一个数位上都是$9$？

#### 思路

~~(大胆猜测个位上不能是偶数或5)~~
实际上仅需判断$gcd(10, x) = 1$是否成立即可。即$x$不能存在质因子$2$和$5$。
时间复杂度：$O(1)$。

#### 代码

``` c++
void solve ()
{
	i64 n;
	cin >> n;
    i64 t = n % 10;
    if (t == 1 || t == 3 || t == 7 || t == 9) {
        cout << "YES\n";
    }else {
        cout << "NO\n";
    }
}
```

### L

#### 题意

给定一个大小为$n \times m$的矩阵停车场，每个车位要么是空地（用 . 表示），要么停着一辆固定方向行驶的汽车，方向为：U(上)，D(下)，L(左)，R(右)。若所有车都能够驶离停车场，按顺序输出离开车辆的坐标，否则输出-1。

#### 思路

简单模拟即可。分别从上到下寻找可以离开停车场的'U'，从下到上寻找可以离开的'D'，从左到右寻找可以离开的'L' ,从右到左寻找可以离开的'R'，依次记录能够离开的车即可。将U, D, L, R记为一轮寻找。若在一轮寻找中没有车能从成功离开且还有车剩余，输出-1即可。
时间复杂度：$O(4 \times n \times m)$。

#### 代码

``` c++
void solve ()
{
	int n, m;
	cin >> n >> m;
	vector <vector <char> > v(n + 1, vector <char> (m + 1));
	int cnt = 0;
	for (int i = 1; i <= n; i++) {
		for (int j = 1; j <= m; j++) {
			cin >> v[i][j];
			if (v[i][j] != '.') cnt++;
		} 
	}
	
	vector <array <int, 2> > ans;
	ans.reserve(cnt + 1);

	vector <int> v1(m + 1, 1);//u
	vector <int> v2(m + 1, n);//d
	vector <int> v3(n + 1, 1);//l
	vector <int> v4(n + 1, m);//r	
	
	int pre = cnt;
	while (cnt > 0) {
		for (int j = 1; j <= m; j++) {
			int i = v1[j];
			while (i <= n && (v[i][j] == 'U' || v[i][j] == '.')) {
				if (v[i][j] == 'U') {
					ans.push_back({i, j});
					cnt--;
					v[i][j] = '.';
				}
				i++;
			}
			v1[j] = i;
		}
		
		for (int j = 1; j <= m; j++) {
			int i = v2[j];
			while (i >= 1 && (v[i][j] == 'D' || v[i][j] == '.')) {
				if (v[i][j] == 'D') {
					ans.push_back({i, j});
					cnt--;
					v[i][j] = '.';
				}
				i--;
			}
			v2[j] = i;
		}
		
		for (int i = 1; i <= n; i++) {
			int j = v3[i];
			while (j <= m && (v[i][j] == 'L' || v[i][j] == '.')) {
				if (v[i][j] == 'L') {
					ans.push_back({i, j});
					cnt--;
					v[i][j] = '.';
				}
				j++;
			}
			v3[i] = j;
		}
		
		for (int i = 1; i <= n; i++) {
			int j = v4[i];
			while (j >= 1 && (v[i][j] == 'R' || v[i][j] == '.')) {
				if (v[i][j] == 'R') {
					ans.push_back({i, j});
					cnt--;
					v[i][j] = '.';
				}
				j--;
			}
			v4[i] = j;
		}
		
		if (pre == cnt) {
			cout << -1 << '\n';
			return;
		}
		
		pre = cnt;
	}

	for (auto [x, y] : ans) {
		cout << x << ' ' << y << '\n';
	}
	
}
```

### J

#### 题意

给定一个以$1$为根，包含$n$ $(1 \leq n \leq 1e5)$个节点的树，每个节点$i$有一个初始权值$m_i$ $(1 \leq m_i \leq 1e9)$，且对于任意非根节点$x$，其权值不会超过其父节点的权值。
现给出$q$ $(1 \leq q \leq 1e5)$次操作。
第一种操作中给出节点$u$和权值$w$ $(1 \leq w \leq 1e9)$，需要找出第一个权值至少为$w$的节点编号，若找不到则输出-1.
第二种操作中给出节点$x$和权值$v$ $(-1e9 \leq w \leq 1e9)$，需要判断给节点$x$的权值加上$v$后其权值是否超过其父节点的权值或小于其叶节点的权值，若超过其父节点的权值或小于其子节点的权值则修改失败，反之修改成功，并修改权值。

#### 思路

对于第一种操作，可以用st倍增快速查询，找到最后一个权值小于$w$的节点输出其父节点即可。
对于第二种操作，可以使用multiset，对每个节点存下其子节点的权值，将修改后的权值与父节点的权值和最大的子节点的权值比较即可。
时间复杂度：$O((n + q) \times \log n)$。

#### 代码

``` c++
const int m = 20;

void solve ()
{
    int n, q;
    cin >> n >> q;
    vector <i64> val(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> val[i];
    }
    vector <vector <int> > e(n + 1);
    for (int i = 1; i < n; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
        e[v].push_back(u);
    }

    vector <int> fa(n + 1);
    vector <int> order;
    order.reserve(n + 1);
    fa[1] = 0;
    
    auto dfs = [&] (auto self, int f, int u) -> void {
        order.push_back(u);
        fa[u] = f;
        for (auto v : e[u]) {
            if (v == f) continue;
            self(self, u, v);
        }
    };
    dfs(dfs, 0, 1);

    vector <array <int, m> > st(n + 1);
    for (auto u : order) {
        st[u].fill(0);
        st[u][0] = fa[u];
    }
    for (int k = 1; k < m; k++) {
        for (int i = 1; i <= n; i++) {
            st[i][k] = st[st[i][k - 1]][k - 1];
        }
    }

    vector <multiset <i64> > a(n + 1);
    for (int i = 2; i <= n; i++) {
        a[fa[i]].insert(val[i]);
    }

    while (q--) {
        int op;
        cin >> op;
        if (op == 1) {
            int u;
            i64 w;
            cin >> u >> w;
            if (val[u] >= w) {
                cout << u << '\n';
                continue;
            }
            int cur = u;
            for (int k = m - 1; k >= 0; k--) {
                int t = st[cur][k];
                if (t != 0 && val[t] < w) {
                    cur = t;
                }
            }
            if (fa[cur] == 0) {
                cout << -1 << '\n';
            }else {
                cout << fa[cur] << '\n';
            }
        }else {
            int x;
            i64 v;
            cin >> x >> v;
            bool ok = true;
            if (x != 1 && v + val[x] > val[fa[x]]) {
                ok = false;
            }
            if (ok && !a[x].empty()) {
                i64 mx = *a[x].rbegin();
                if (v + val[x] < mx) {
                    ok = false;
                }
            }
            if (!ok) {
                cout << "FAILED\n";
                continue;
            }
            if (x != 1) {
                a[fa[x]].erase(a[fa[x]].find(val[x]));
                a[fa[x]].insert(v + val[x]);
            }
            val[x] += v;
            cout << "SUCCESS\n";
        }
    }
}
```

### B

#### 题意

有$n$ $(1 \leq n \leq 20)$个连续的公交车座位，编号从$1$到$n$，其中有$m$ $(0 \leq m \leq n)$个座位是损坏的。Alice和Bob轮流安排乘客入座，Alice先手，并希望入座的乘客尽量多，Bob希望入座的乘客尽量少。给定距离$k$，要求任意两名乘客的间距至少大于$k$ $(1 \leq k \leq 20)$。以字符串的形式输出最终可能的座位状态。

#### 思路

注意到$n \leq 20$，考虑状压dp。设$dp[mask]$表示座位占有情况为$mask$时，最优的总入座人数。提前用dfs处理好每一个状态的最优总入座人数：若轮到Alice，其目标为最大化最终人数，枚举每一个合法的$i$，即：$dp[mask] = max \, dp[mask \mid (1 \ll i)]$，若轮到Bob，其目标为最小化最终人数，枚举每一个合法的$i$，即：$dp[mask] = min \, dp[mask \mid (1 \ll i)]$。
接下来需要还原最终方案：可以从$mask = 0$开始正向模拟，对于$mask$状态，枚举所有合法的$i$，寻找某个$dp[mask \mid (1 \ll i)] = dp[mask]$，并将$mask$更新为$mask \mid (1 \ll i)$后继续查找即可。
时间复杂度：$O(n \times 2^n)$。

#### 代码

``` c++
void solve ()
{
    int n, k, m;
    cin >> n >> k >> m;
    string s = string(n, '.');
    for (int i = 0; i < m; i++) {
        int t;
        cin >> t;
        t--;
        s[t] = 'x';
    }

    vector <i64> a(n, 0);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i == j) continue;
            if (abs(i - j) <= k) {
                a[i] |= (1LL << j);
            }
        }
    }

    vector <i64> dp(1LL << n, -1);
    auto dfs = [&] (auto self, i64 mask, int cnt) -> i64 {
        if (dp[mask] != -1) return dp[mask];
        if (cnt & 1) {
            dp[mask] = 1e11;
        }else {
            dp[mask] = -1e11;
        }

        bool ok = false;
        for (int i = 0; i < n; i++) {
            if (s[i] == 'x') continue;
            if ((mask >> i) & 1) continue;
            if ((mask & a[i]) != 0) continue;
            ok = true;
            i64 nxt = mask | (1LL << i);
            i64 val = self(self, nxt, cnt + 1);
            if (cnt & 1) {
                dp[mask] = min(dp[mask], val);
            }else {
                dp[mask] = max(dp[mask], val);
            }
        }

        if (!ok) {
            dp[mask] = cnt;
        }

        return dp[mask];
    };
    dfs(dfs, 0LL, 0LL);

    i64 mask = 0LL;
    int cnt = 0;
    
    while (1) {
        int t = -1;
        for (int i = 0; i < n; i++) {
            if (s[i] == 'x') continue;
            if ((mask >> i) & 1) continue;
            if ((mask & a[i]) != 0) continue;

            i64 nxt = mask | (1LL << i);
            if (dp[nxt] == dp[mask]) {
                t = i;
                break;
            }
        }
        if (t == -1) break;
        if (cnt & 1) {
            s[t] = 'b';
        }else {
            s[t] = 'a';
        }
        mask |= (1LL << t);
        cnt++;
    }

    cout << s << '\n';
}
```

### C

#### 题意

给定大小为$n \times m$（$1 \leq n, m \leq 1e5$ 且 $n \times m \leq 2e5$）的矩阵，每个格子上都有一个权值$a_{ij}$ $(a_{ij} < 2^{30})$。从左上角$(1, 1)$走到右下角$(n, m)$，设路径上的地点值以此为$a_1, a_2, ... , a_k$，定义消耗的体力为$OR = a_1 \mid a_2 \mid ... \mid a_k$, 定义剩下的物资为$AND = a_1 \& a_2 \& ... \& a_k$。要求在消耗的体力最小的情况下，最大化剩下的物资。输出最小体力消耗和最大物资剩余。

#### 思路

先满足体力最小的条件，可以从高到低按位枚举确定答案，处理第$i$位时，尝试要求第$i$位全部为$0$。对整张图进行bfs，找出一条路径，其所有的点满足高位贪心结果且第$i$位都为$0$的路径。若不存在，该位只能为$1$。
再满足最大物资剩余的条件，同样从高到低按位枚举，处理第$i$位时，尝试要求第$i$位全部为$1$。在满足体力最小的基础上，找出一条路径，其所有的点满足高位贪心结果且第$i$位都为$1$的路径。若不存在，该位只能为$0$。
时间复杂度：$O(58 \times n \times m)$。

#### 代码

``` c++
const int dx[4] = {1, 0, -1, 0};
const int dy[4] = {0, -1, 0, 1};

void solve ()
{
    int n, m;
    cin >> n >> m;
    vector <vector <i64> > v(n + 1, vector <i64> (m + 1));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            cin >> v[i][j];
        }
    }

    i64 ans1 = 0;
    int t = 0;
    for (int i = 29; i >= 0; i--) {
        if (((v[1][1] >> i) & 1) || ((v[1][1] & t) != 0)) {
            ans1 += (1LL << i);
            continue;
        }

        vector <vector <int> > vis(n + 1, vector <int> (m + 1, 0));
        queue <array <int, 2> > q;
        q.push({1, 1});
        vis[1][1] = true;
        bool ok = false;
        while (!q.empty()) {
            auto [x, y] = q.front();
            q.pop();
            if (x == n && y == m) {
                ok = true;
                break;
            }
            for (int j = 0; j < 4; j++) {
                int xx = x + dx[j];
                int yy = y + dy[j];
                if (xx < 1 || xx > n || yy < 1 || yy > m) continue;
                if (vis[xx][yy]) continue;
                vis[xx][yy] = true;
                if (((v[xx][yy] >> i) & 1) || (v[xx][yy] & t) != 0) continue;
                q.push({xx, yy});
            }
        }
        if (!ok) {
            ans1 |= (1LL << i);
        }else {
            t |= (1LL << i);
        }
    }

    i64 ans2 = 0;
    i64 x = 0;

    for (int i = 29; i >= 0; i--) {
        if (((ans1 >> i) & 1) == 0) continue;
        i64 a = x | (1LL << i);
        if ((v[1][1] & t) != 0 || (v[1][1] & a) != a) continue;

        vector <vector <int> > vis(n + 1, vector <int> (m + 1, 0));
        queue <array <int, 2> > q;
        q.push({1, 1});
        vis[1][1] = true;
        bool ok = false;
        while (!q.empty()) {
            auto [x, y] = q.front();
            q.pop();
            if (x == n && y == m) {
                ok = true;
                break;
            }
            for (int j = 0; j < 4; j++) {
                int xx = x + dx[j];
                int yy = y + dy[j];
                if (xx < 1 || xx > n || yy < 1 || yy > m) continue;
                if (vis[xx][yy]) continue;
                vis[xx][yy] = true;
                if ((v[xx][yy] & t) != 0 || (v[xx][yy] & a) != a) continue;
                q.push({xx, yy});
            }
        }

        if (ok) {
            ans2 |= (1LL << i);
            x |= (1LL << i);
        }
    }

    cout << ans1 << ' ' << ans2 << '\n';
}
```

