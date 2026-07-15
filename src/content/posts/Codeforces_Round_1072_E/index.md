---
title: "Codeforces Round 1072 (Div.3) E题题解"
published: 2026-01-13
description: "记录 Codeforces Round 1072 (Div.3) E 题的思路分析与代码实现。"
tags: ["算法", "题解", "Codeforces"]
category: "算法竞赛"
draft: false
---
# Codeforces Round 1072 (Div.3) E题题解

## 题意：

定义精致数组-$k$为任意相邻两数之差至少为$k$的数组。

给定长度为$n$的排列$p$，对于每一个从$1$到$n - 1$的$k$，找出精致数组-$k$的数量。

<!-- more -->

## 思路：

题目要求: 寻找相邻差值至少为$k$的数组个数。

这可以转化为：寻找差分数组中某一子段的最小值至少为$k$的数组个数。

这仍然很麻烦。于是我们可以先统计出最小值为$k,k\in [1, n - 1]$的子段数，最后再做前缀和即可转换为最小值至少为$k$的数组个数。

关于统计最小值为$k$的子段数，我们可以对差分数组中的每一个数进行单独计算：

对于第$i$个差值，我们可以利用两次单调栈统计出第$i$个差值左侧最近的满足$d[l]<=d[i]$的$l$和右侧最近的满足$d[r]<d[i]$的$r$，这样即可以求出对于当前的$d[i]$，以$d[i]$为最小值的数组个数：$(i - l + 1 - 1) \times (r - i + 1 - 1)$，即：$(i - l) \times (r - i)$。

这样即可不重不漏地统计出所有最小值为$k$的子段数，最后再从$1$到$n$做前缀和即可求出最小值至少为$k$的数组个数。

## 代码：

``` c++
#include <bits/stdc++.h>
using namespace std;
using ld = long double;
#define int long long
#define fi first
#define se second

void solve ()
{
    int n; cin >> n;
    vector <int> v(n + 1), d(n + 3);
    for (int i = 1; i <= n; i++) {
        cin >> v[i];
        d[i] = abs(v[i] - v[i - 1]);
    }

    vector <int> al(n + 3, 1), br(n + 3, n + 1);
    vector <int> stk;

    for (int i = 2; i <= n; i++) {
        while (stk.size() && d[stk.back()] > d[i]) {
            stk.pop_back();
        }
        if (stk.size()) al[i] = stk.back();
        stk.push_back(i);
    }

    stk.clear();
    for (int i = n; i >= 2; i--) {
        while (stk.size() && d[stk.back()] >= d[i]) {
            stk.pop_back();
        }
        if (stk.size()) br[i] = stk.back();
        stk.push_back(i);
    }

    vector <int> ans(n + 1, 0);
    for (int i = 2; i <= n; i++) {
        ans[d[i]] += (br[i] - i) * (i - al[i]);
    }

    for (int i = n - 2; i >= 1; i--) {
        ans[i] += ans[i + 1];
    }

    for (int i = 1; i < n; i++) {
        cout << ans[i] << " \n"[i == n - 1];
    }
}   
    
signed main ()
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


