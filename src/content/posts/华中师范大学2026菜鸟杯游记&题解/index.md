---
title: "华中师范大学2026菜鸟杯游记及部分题解"
published: 2026-03-23
description: "记录我参加华中师范大学 2026 菜鸟杯的经历，以及部分题目的题解和代码。"
image: "./cover.jpg"
tags: ["博客", "算法", "竞赛"]
category: "算法竞赛"
draft: false
---
# 华中师范大学2026菜鸟杯游记及部分题解

## 游记

下半学期参加的第一场线下赛，打得有点不尽人意。开头被A卡死，一直没发现代码的bug，卡了半个小时，很难受。J题花的时间略有一些长，不过还好过得也算足够快。而后面的H题一直没注意到1e9可拆分的性质，一直不知道怎么写。幸好盯了一会后总算发现，打暴力就行了。而对于后面的偏难的题目有些手足无措的感觉，E题的思路很晚才出，导致F题出了部分思路但后面已经没有时间了。以后得加强难题的训练了。

午饭挺丰盛的，好评。华师不大，但是风景挺好，已经羡慕了TAT。

## 题解

### D

#### 代码

``` c++
void solve ()
{
    cout << "CCNU,Ciallo~(<`w< )n*!";
}
```

### A

#### 题意

给定字符串A，B，S，将S中与A匹配的部分替换成B。

#### 思路

简单模拟即可(B题真是。。)

#### 代码

``` c++
void solve ()
{
    int a, b, s;
    cin >> a >> b >> s;
    string aa, bb, ss;
    cin >> aa >> bb >> ss;
    for (int i = 0; i <= ss.size() - a; i++) { 
        string t = ss.substr(i, a);
        if (t == aa) {
            ss.replace(ss.begin() + i, ss.begin() + i + a, bb);
            i += b - 1;
        }
    } 
    cout << ss << '\n';
}
```

### I

#### 题意

给定$n$款游戏，要求在一定要送出特定一款游戏的情况下购买最多款游戏。

#### 思路

简单模拟即可。~~（赛时以为能购买多个同款游戏而卡了半天）~~

#### 代码

``` c++
void solve ()
{
    double m, n;
    cin >> m >> n;
    vector <array <double, 2> > v(n + 1);
    string t = "FemboyLovestory";
    bool ok = false;
    double x = -1.0;
    for (int i = 1; i <= n; i++) {
        string s;
        cin >> s;
        if (s == t) {
            ok = true;
        }
        i64 a, c;
        cin >> a >> c;
        v[i][0] = 1.0 * a * c / 100;
        if (s == t) {
            v[i][1] = 1;
            x = v[i][0];
        }else {
            v[i][1] = 0;
        }
    }

    sort(v.begin() + 1, v.end());

    if (!ok) {
        cout << 0 << '\n';
        return;
    }

    m -= x;
    if (m < 0) {
        cout << 0 << '\n';
        return;
    }
    int ans = 1;
    for (int i = 1; i <= n; i++) {
        if (v[i][1] == 1) continue;
        m -= v[i][0];
        if (m >= 0) ans++;
        else break;
    }

    cout << ans << '\n';
}
```

### J

#### 题意

小A把$N$颗糖以最优策略摆成一长条后，与小B一起从左端开始吃糖。小B先吃。每次吃糖最多吃$3$颗，最少吃$1$颗。$N$颗糖中有一颗特殊的糖，两人都不希望吃到这一颗糖。小B可以随时将特殊的糖移动到右端末尾，但只能移动一次。若小A吃到特殊的糖，输出"Yes"，否则输出"No"。

#### 思路

简单博弈题。首先因为小B不知道特殊糖的位置，因此无论如何都应该将特殊的糖转移到糖的末端。枚举出糖的数量为$1, 5$时为NO，$2, 3, 4$为YES后，考虑状态转移。在吃糖数量最多吃三颗，最少吃一颗的情况下，$6, 7, 8$颗糖时小B都能将糖的数量转移到$5$的先手必输态，$9$颗糖时无法转移到$5$颗糖的先手必输态。由此可观察出当 $n \bmod 4 == 1$ 时小B必输，其余情况小B必赢。

#### 代码

``` c++
void solve ()
{
    i64 n;
    cin >> n;
    if (n % 4 == 1) {
        cout << "No\n";
    }else {
        cout << "Yes\n";
    }
}
```

### C

#### 题意

构造一个含有$n$个$0$和$m$个$1$的字符串S，满足字符串中任意一个子段满足子段中$0$的个数和$1$的个数的绝对值差值小于等于$k$且至少存在一个子段差值等于$k$。保证存在一个合法的解。

#### 思路

简单构造题。题目保证了存在合法的解，我们便可以先满足至少存在一个子段差值等于$k$的条件。先让个数多的输出$k$个后再01或10地交替，这样保证了最优的构造。最后若有剩下的，因为题目保证合法，直接输出即可。

#### 代码

``` c++
void solve ()
{
    int n, m, k;
    cin >> n >> m >> k;
    if (n > m) {
        for (int i = 0; i < k; i++) {
            cout << '0';
        }
        int t0 = n - k;
        for (int i = 0; i < t0; i++) {
            cout << "10";
        }
        int l = m - t0;
        for (int i = 0; i < l; i++) {
            cout << '1';
        }
    }else {
        for (int i = 0; i < k; i++) {
            cout << '1';
        }
        int t0 = m - k;
        for (int i = 0; i < t0; i++) {
            cout << "01";
        }
        int l = n - t0;
        for (int i = 0; i < l; i++) {
            cout << '0';
        }
    }
}
```

### H

#### 题意

给定$T$组两个整数$n$, $m$，满足$n < m$,计算$n \times (n + 1) \times (n + 2) \times ··· \times m$对$1e9$取模后的结果。
$(1 \leq n \leq m \leq 1e9)$
$(1 \leq T \leq 1e5)$

#### 思路

$1e9$由$9$个$2$和$9$个$5$相乘组成，由于只有$1e5$组数据，直接暴力计算$1e3$个数绝对是够的（事实上只用$40$个数据就够了）。

#### 代码

``` c++
const i64 mod = 1e9;

void solve ()
{
    i64 n, m;
    cin >> n >> m;
    i64 res = m % mod;
    for (int i = m - 1; i >= max(m - 1000, n); i--) {
        res = (res * i) % mod;
    }
    cout << res << '\n';
}
```

### E

#### 题意

Windows和Soubai比赛谁能活到最后，其生命值分别为$x$，$y$，实力分别为$A$，$B$，Boss的实力为$C$。
比赛每轮会恰好发生三种事件之一，直至有人生命值小于等于$0$：
1. Windows有$A / C$的概率命中Soubai，对Soubai造成等于其自身生命值的伤害。
2. Soubai有$B / C$的概率命中Windows，对Windows造成等于其自身生命值的伤害。
3. 双方有$1 - A / C - B / C$的概率均未命中。
求出Windows赢得比赛的概率。

#### 思路

首先可以简化模型，因为平局对胜负无影响，所以我们可以忽略平局。设$p_0$,$p_1$分别为Windows打到Soubai的概率和Soubai打到Windows的概率。其中$p_0 = A / (A + B)$，$p_1 = B / (A + B)$。
我们可以根据生命值的大小分成三种情况，分别为$x > y$, $x < y$和$x = y$。我们需要维护至当前状态所需要的概率$res$。

当$x > y$时，要想使回合进行下去，只能由Soubai攻击Windows，同时每次攻击之后，Windows都能够直接击杀Soubai。因此在当前状态下，设Soubai能够攻击Windows的次数为$cnt$，Windows能赢得的概率为：$P = res * (p_0 + p_0 * p_1 + ··· + p_0 * p_1^{cnt})$,即$P = \frac{res \cdot p_0 \cdot p_1 \left(p_1^{\mathrm{cnt}} - 1\right)}{p_1 - 1}$。

当$x < y$时，要想使回合进行下去，只能由Windows攻击Soubai。但是这个时候不会出现Windows赢得比赛的情况，因此在当前状态下，只需要简单维护$res$即可。

当$x = y$时，只能由Windows攻击Soubai后得到答案。

直到$x$或$y$小于等于$0$时，结束比赛，输出答案即可。

#### 代码

``` c++
const i64 mod = 998244353;

i64 qpow (i64 a, i64 b) {
    i64 res = 1;
    while (b) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

void solve ()
{
    i64 x, y, a, b, c;
    cin >> x >> y >> a >> b >> c;
    
    i64 ans = 0;
    i64 res = 1;
    i64 p0 = a * qpow(a + b, mod - 2) % mod;
    i64 p1 = b * qpow(a + b, mod - 2) % mod;

    auto cal1 = [&] (i64 &x, i64 &y) {
        i64 cnt = x / y - (x % y == 0 ? 1 : 0);
        i64 sum = res * (1 + (mod - qpow(p1, cnt)) % mod) % mod;
        sum = sum * qpow((1 + mod - p1) % mod, mod - 2) % mod;
        ans = (ans + (sum * p0) % mod) % mod;
        res = res * qpow(p1, cnt) % mod;
        x -= cnt * y;
    };

    auto cal2 = [&] (i64 &x, i64 &y) {
        i64 cnt = y / x - (y % x == 0 ? 1 : 0);
        res = res * qpow(p0, cnt) % mod;
        y -= cnt * x;
    };

    while (x > 0 && y >  0) {
        if (x > y) {
            cal1(x, y);
        }else if (x < y) {
            cal2(x, y);
        }else {
            ans = (ans + (res * p0 % mod)) % mod;
            break;
        }
    } 

    cout << ans << '\n';

}
```

### F

#### 题意

给定一个长度为$n$的数组$a$，要求支持一共$q$次的以下两种操作:
1. 输入$1 x v$，将数组下标为$x$的元素改成$v$。
2. 输入$2 p$，查询可重集合$ \{a_1 \bmod p, a_2 \bmod p, ···, a_n \mod p\}$的中位数。
$(1 \leq n \leq 1e5, 1 \leq q \leq 1e5)$
$(1 \leq a_i \leq 2e5)$
$(1 \leq x \leq n, 0 \leq v \leq 2e5, 1 \leq p \leq 2e5)$

#### 思路

很容易想到使用树状数组维护每一个值出现的个数并进行修改和查询。对于查询中位数而言，则是经典的根号分治的思想。对于小于$\sqrt {2e5}$的数，只需维护每一个小于$\sqrt {2e5}$的余数出现的次数即可，而对于大于$\sqrt {2e5}$的数，只需在每一个区间进行二分即可。这样即可解决中位数的问题了。

#### 代码

``` c++
const int m = 450;
const int mx = 2e5 + 5;

class BIT {
    public:
        int n;
        vector <i64> bit;

        BIT (int n = 0) {init(n);}
    
        void init (int m) {
            n = m;
            bit.assign(n + 1, 0);
        }

        static i64 lowbit (i64 x) { return x & -x; }

        i64 sum (int idx) const {
            i64 res = 0;
            for (; idx > 0; idx -= lowbit(idx)) res += bit[idx];
            return res; 
        }

        void point_add (int idx, i64 diff) {
            for (; idx <= n; idx += lowbit(idx)) bit[idx] += diff;
        }

        i64 point_query (int idx) const {
            return sum(idx) - sum(idx - 1);
        }

};

void solve ()
{
    int n, q;
    cin >> n >> q;
    vector <int> v(n + 1);
    for (int i = 1; i <= n; i++) {
    	cin >> v[i];
    }

    BIT bit(mx + 2);
    for (int i = 1; i <= n; i++) {
    	bit.point_add(v[i] + 1, 1);
    }

    vector <vector <int> > a(m + 1);
    for (int i = 1; i <= m; i++) {
    	a[i].assign(i, 0);
    }
    for (int i = 1; i <= n; i++) {
    	for (int j = 1; j <= m; j++) {
    		a[j][v[i] % j]++;
    	}
    }

    while (q--) {
    	int op;
    	cin >> op;
    	if (op == 1) {
    		int x, b;
    		cin >> x >> b;
    		if (v[x] == b) continue;
    		bit.point_add(v[x] + 1, -1);
    		bit.point_add(b + 1, 1);
    		for (int i = 1; i <= m; i++) {
    			a[i][v[x] % i]--;
    			a[i][b % i]++;
    		}
    		v[x] = b;
    	}else {
    		int x;
    		cin >> x;
    		if (x <= m) {
    			int sum = 0;
    			int ans = 0;
    			for (int i = 0; i < x; i++) {
    				sum += a[x][i];
    				if (sum >= (n + 1) / 2) {
    					ans = i;
    					break;
    				}
    			}
    			cout << ans << '\n';
    		}else {
    			int l = 0, r = x - 1;
    			int ans = x - 1;

    			auto check = [&] (int md) -> bool {
    				int res = 0;
    				for (int i = 0; i <= mx; i += x) {
    					res += bit.sum(min(i + md, mx) + 1) - bit.sum(i);
    				}
    				return res >= (n + 1) / 2;
    			};

    			while (l <= r) {
    				int mid = l + (r - l) / 2;
    				if (check(mid)) {
    					r = mid - 1;
    				}else {
    					l = mid + 1;
    				}
    			}
    			cout << l << '\n';
    		}
    	}
    }
} 
```
