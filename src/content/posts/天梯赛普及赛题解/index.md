---
title: "天梯赛普及赛编程题题解"
published: 2026-03-14
description: "整理天梯赛普及赛编程题的题解与代码实现。"
tags: ["算法", "题解", "天梯赛"]
category: "算法竞赛"
draft: false
---
# 天梯赛普及赛编程题题解

# 天梯赛普及赛编程题题解



## 1



``` c++
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

void solve ()
{
    cout << "If people never did silly things, nothing intelligent would ever get done.";
}

int main ()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```



## 2



```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

void solve ()
{
    int x, n, y;
    cin >> x >> n >> y;
    cout << x * n + y << '\n';
}

int main ()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```



## 3

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

void solve ()
{
    int a, b, c;
    cin >> a >> b >> c;
    cout << a << '\n';
    if (a < b) {
        cout << "Bu Kan";
    }else if (a >= b && a < c) {
        cout << "Zhe Gua Bao Shu Ma";
    }else {
        cout << "Chi Gua";
    }
}

int main ()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```



## 4

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

void solve ()
{
    int n;
    cin >> n;
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        int t;
        cin >> t;
        if (!(i & 1)) {
            ans += t;
        }
    }
    cout << ans;
}

int main ()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```



## 5

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

void solve ()
{
    int a, b;
    cin >> a >> b;
    int res = a + b;
    int t;
    int ans = 1;
    while (cin >> t) {
        if (t == res) {
            cout << res << ' ' << "Accepted ";
            int l = ans % 60;
            int minute = ((ans - l) / 60) % 60;
            int hour = (ans - l - minute * 60) / 3600;
            if (hour <= 9) cout << "0" << hour;
            else cout << hour;
            cout << ":";
            if (minute <= 9) cout << "0" << minute;
            else cout << minute;
            cout << ":";
            if (l <= 9) cout << "0" << l;
            else cout << l;
            return;
        }
        ans += 2;
        if (ans >= 10800) {
            ans = 10799;
            break;
        }
    }

    cout << t << ' ' << "Wrong Answer " << "02:59:59";
}

int main ()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```



## 6

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

void solve ()
{
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int t;
        int ans = 0;
        bool ok = false;
        map <int, int> mp;
        while (cin >> t) {
            if (t == -1) break;
            if (!ok && mp[t]) {
                ans = t;
                ok = true;
            }
            mp[t] = true;
        }
        if (ok) {
            cout << ans << '\n';
        }else {
            cout << "NONE\n";
        }
    }
}

int main ()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```



## 7

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

void solve ()
{
    int n;
    cin >> n;

    auto cal1 = [&] (i64 x) -> bool {
        i64 res = 0;
        while (res * res * 2 <= x) {
            if (res * res * 2 == x) return true;
            res++;
        }
        if (res * res * 2 == x) return true;
        else return false;
    };

    auto cal2 = [&] (i64 x) -> bool {
        i64 res = 0;
        while (res * res * res * 3 <= x) {
            if (res * res * res * 3 == x) return true;
            res++;
        }
        if (res * res * res * 3 == x) return true;
        else return false;
    };
 
    for (int i = 1; i <= n; i++) {
        i64 t;
        cin >> t;
        bool ok1 = cal1(t);
        bool ok2 = cal2(t);
        if (ok1 && ok2) {
            cout << t << ' ' << "is a triple flower" << '\n';
        }else if (ok1 && !ok2) {
            cout << t << ' ' << "is a double flower" << '\n';
        }else {
            cout << t << ' ' << "is" << ' ' << t << '\n';
        }
    }
}

int main ()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```



## 8

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

void solve ()
{
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        vector <i64> v;
        v.reserve(10001);
        i64 t;
        while (cin >> t) {
            if (t == -1) break;
            v.push_back(t);
        } 
        int m = v.size();
        bool ok = false;
        i64 ans1, ans2, ans3;
        unordered_map <i64, vector <int> > mp;
        for (int i = 0; i < m; i++) {
            if (i == m - 1 || i == m - 2) continue;
            mp[v[i]].push_back(i);
        }

        vector <array <i64, 4> > ans;
        unordered_map <int, int> mpp;
        mpp[v[m - 1]] = true;
        mpp[v[m - 2]] = true;
        for (int i = 0; i < m - 2; i++) {
            if (mpp[v[i]]) continue;
            i64 a = v[i + 1], b = v[i + 2];
            bool found = true;
            int cnt = 0;
            int pos = 0;
            for (auto x : mp[v[i]]) {
                i64 c = v[x + 1], d = v[x + 2];
                if (c != a || d != b) {
                    found = false;
                    break;
                }
                cnt++;
                if (cnt == 2) {
                    pos = x;
                }
                // cout << v[i] << ' ' << pos << '\n';
            }
            if (found && cnt >= 2) {
                ok = true;
                ans.push_back({pos, v[i], a, b});
            }
            mpp[v[i]] = true;
        }

        if (ans.size()) sort(ans.begin(), ans.end());
        if (ans.size()) {
            cout << ans[0][1] << ' ' << ans[0][2] << ' ' << ans[0][3] << '\n';
        }else {
            cout << "NONE\n";
        }
    }
}

int main ()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```



## 9

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;

void solve ()
{
    int n, m;
    cin >> n >> m;
    vector <vector <int> > e(m + 5);
    vector <vector <int> > v(n + 5);
    v.reserve(201 * 1001);
    for (int i = 1; i <= n; i++) {
        int t;
        cin >> t;
        v[i].reserve(1001);
        for (int j = 1; j <= t; j++) {
            int b;
            cin >> b;
            v[i].push_back(b);
            e[b].push_back(i);
        }
        sort(v[i].begin(), v[i].end());
        v[i].erase(unique(v[i].begin(), v[i].end()), v[i].end());
    }

    vector <vector <int> > a(n + 5);
    int cnt = 1;
    vector <int> vis(m + 5);
    vector <int> viss(n + 5);

    auto dfs = [&] (auto self, int u) -> void {
        for (auto x : e[u]) {
            if (viss[x]) continue;
            viss[x] = true;
            for (auto y : v[x]) {
                if (vis[y]) continue;
                vis[y] = true;
                a[cnt].push_back(y);
                self(self, y);
            }
        }
    };

    for (int i = 1; i <= m; i++) {
        if (vis[i]) continue;
        vis[i] = true;
        a[cnt].push_back(i);
        dfs(dfs, i);
        cnt++;
    }

    for (int i = 1; i < cnt; i++) {
        sort(a[i].begin(), a[i].end());
        if (i == cnt - 1) cout << a[i][0];
        else cout << a[i][0] << ' ';
    }
}

int main ()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}
```

