---
title: "CF1463B题解"
published: 2026-05-22
description: "CF1463B题解"
tags: ["算法", "题解", "Codeforces"]
category: "算法竞赛"
draft: false
---
# CF1463B题解 

## 题意：

[题目链接](https://codeforces.com/problemset/problem/1463/B)  

给你一个数组 $[a_1, a_2, \dots, a_n]$ ，其中有 $1 \le a_i \le 10^9$ 。设 $S$ 是数组 $a$ 中所有元素的和。

如果 $n$ 个整数组成的数组 $b$ **漂亮**，那么我们就把这个数组称为 $b$ ：

- 从 $1$ 到 $n$ 的每个 $i$ 都是 $1 \le b_i \le 10^9$ ；
- 对于数组 $(b_i, b_{i + 1})$ 中的每一对相邻整数，要么是 $b_i$ 除以 $b_{i + 1}$ ，要么是 $b_{i + 1}$ 除以 $b_i$ （或者两者都是(或两者）；
- $2 \sum \limits_{i = 1}^{n} |a_i - b_i| \le S$ .

<!-- more -->

## 思路：

对于构造合法解的题目，我们可以先想什么能够稳定的构造相邻整除的数组。再结合$2 \sum \limits_{i = 1}^{n} |a_i - b_i| \le S$，不难推得$$ \frac{1}{2}a_i \leq b_i \leq \frac{3}{2}a_i$$
注意到存在$ \frac{1}{2}a_i$，可以想到把每一个$b_i$都设置成小于等于$b_i$的最大的$2$的幂。即有：$0 \leq a_i - b_i < \frac{1}{2}a_i$
求和即有：$$\sum \limits_{i = 1}^{n} |a_i - b_i| \leq \frac{1}{2}S$$
满足要求

## 代码：

``` c++
void solve ()
{
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int t;
        cin >> t;
        cout << (1LL << __lg(t)) << " \n"[i == n];
    }
}   
```


