---
title: "Atcoder Beginner Contest 459 F题题解"
published: 2026-05-24
description: "Atcoder Beginner Contest 459 F题题解"
tags: ["算法", "题解", "Atcoder"]
category: "算法竞赛"
draft: false
---
# Atcoder Beginner Contest 459 F题题解

## 题意：

给你一个长度为 $N$ 的非负整数序列 $A = (A_1, A_2, \ldots, A_N)$ 。

你可以对 $A$ 执行下列操作零次或多次：

- 选择一个有 $1 \le i \le N - 1$ 的整数 $i$ ，将 $A_i$ 减少 $1$ ，并将 $A_{i+1}$ 增加 $1$ 。

求使 $A$ 严格递增所需的最小运算次数。

可以证明答案小于 $2^{63}$ 。

给你 $T$ 个测试用例，请逐个求解。

- $1 \le T \le 3 \times 10^5$
- $1 \le N \le 2 \times 10^5$
- $0 \le A_i \le 10^9$
- 所有测试用例中 $N$ 的总和最多为 $6 \times 10^5$ 。
- 所有输入值均为整数。

## 思路：

- 将求严格递增的序列 $B$ 转换为求非递减的序列 $B$ 。

将原序列 $A$ 的每一项转换为 $a_i - i$ 即可。设序列 $B$ 为 $b_i = a_i - i$， 则 $b_i - b_{i - 1} = a_i - a_{i - 1} - (i - (i - 1))$， 即 $b_i - b_{i - 1} = a_i - a_{i - 1} - 1$，这天然满足严格递增的条件，因此求非递减的序列即可。

- 将每个数看成一个块，若左边的块的最右端的值大于右边的块的最左端的值，将两个块合并成一个块。在处理每一个块时，需要将块中的值尽可能平均放。
  
开始时每个块中非递减严格成立。在处理每一个块时，若遇到左边的值的最右端的值大于右边的块的最左端的值，需要合并两个块。此时的情况是需要将左边的值转移至右边，我们就可以尽可能贪心的让左边的值少减一点，即将左端的值最大化，右端的值最小化。在处理每一个块时，我们只需要维护其块内的值的总和和块的长度即可。从左到右遍历块，最后形成一个满足条件的连续的若干个块。

- 设原序列为 $A$， 最终序列为 $B$，则答案 $ans$ 为： $ans = \sum_{i = 1}^{n} (prefixA_i - prefixB_i)$

设序列 $X$，令 $x_i$ 为从第 $i$ 个点到第 $i + 1$ 个点被操作了多少次$(1 \leq i \leq n - 1)$，则 $b_i = a_i + x_{i - 1} - x_i$。易得 $x_1 = a_1 - b_1$，则 $x_2 = a_2 - b_2 + x_1$，即 $x_2 - x_1 = a_2 - b_2$，即有：$x_2 = (a_2 - b_2) + (a_1 - b_1)$，所以有：$$x_i = prefixA_i - prefixB_i$$。答案便是 $\sum_{i = 1}^{n}x_i$

## 代码：

``` c++
#include <bits/stdc++.h>
using namespace std;
#define int long long

struct node {
    int len, sum;
    node operator + (const node &other) const {
        return node{other.len + len, other.sum + sum};
    }
};

int Floor (int a, int b) {
    if (a >= 0) return a / b;
    return -((-a + b - 1) / b);

}

int Ceil (int a, int b) {
    return -Floor(-a, b);
}

void solve ()
{
    int n;
    cin >> n;
    vector <int> v(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        v[i] -= i;
    }

    vector <node> st;
    for (int i = 1; i <= n; i++) {
        st.push_back({1, v[i]});
        while (st.size() >= 2) {
            node s = st.back();
            node t = st[st.size() - 2];
            int smn = Floor(s.sum, s.len);
            int tmx = Ceil(t.sum, t.len);
            if (smn < tmx) {
                st.pop_back();
                st.pop_back();
                st.push_back({s + t});
            }else {
                break;
            }
        }
    }

    vector <int> f(n + 1);
    int pos = 1;

    for (auto x : st) {
        int mn = Floor(x.sum, x.len);
        int cmx = x.sum - mn * x.len;
        int cmn = x.len - cmx;
        for (int i = 1; i <= cmn; i++) {
            f[pos++] = mn;
        }
        for (int i = 1; i <= cmx; i++) {
            f[pos++] = mn + 1;
        }
    }

    int ans = 0;
    int pv = 0, pf = 0;
    for (int i = 1; i <= n - 1; i++) {
        pv += v[i];
        pf += f[i];
        ans += pv - pf;
    }

    cout << ans << '\n';
}   
    
int32_t main ()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    int _ = 1;
    cin >> _;
    while (_--) {
        solve();
    }
    return 0;
} 
```


