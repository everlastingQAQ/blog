---
title: "C语言作业答案(下)"
published: 2026-01-07
description: "整理 C 语言作业下半部分的参考答案，方便复习与查阅。"
tags: ["C语言", "作业", "答案"]
category: "C 语言"
draft: false
---
# C语言作业答案(下)

## 第六章1

### 逆序输出输入的整数

<!-- more -->

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int num [n];
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &num [i]);
	}
	
	int mask = 1;
	
	for (int j = n - 1; j >= 0; j--) {
		if (mask == 1) {
			printf("%d", num [j]);
			mask = 0;
		}else {
			printf(" %d", num [j]);
		}
	}
	
	return 0;
	
}
```

### 统计各大写字母的个数

``` c++
#include <stdio.h>

int main ()
{
	char s[10000];
	scanf("%[^\n]", s);
	
	int cnt[26] = {0};
	
	for (int i = 0; s[i] != '\0'; i++) {
		if (s[i] >= 'A' && s[i] <= 'Z') {
			cnt[s[i] - 'A']++;
		}
	}
	
	for (int i = 0; i < 26; i++) {
		printf("%c(%d)", 'A' + i, cnt[i]);
		if ((i + 1) % 5 == 0) {
			printf("\n");
		}
	}
	
	return 0;
	
}

```

### 输出斐波那契数列的前n项

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int num [n];

	for (int i = 0; i < n; i++) {
		if (i == 0 || i == 1) {
			num [i] = 1; 
		}else {
			num [i] = num [i - 1] + num [i - 2];
		}	
	}
	
	int mask = 1;
		
	for(int j = 0; j < n; j++) {
		if (mask % 5 == 0) {
			if (mask == n) {
				printf("%10d", num [j]);
			}else {
				printf("%10d\n", num [j]);
				mask++;
			}
		}else {
			printf("%10d", num [j]);
			mask++;
		}
	}
	
	return 0;
	
}

```

### 约瑟夫问题

``` c++
#include <stdio.h>

int main()
{
	int n, m, s;
	scanf("%d %d %d", &n, &m, &s);
	
	int num[n + 1];
	num[0] = 0;
	
	for (int i = 1; i <= n; i++) {
		num[i] = i;
	}
	
	int i = s;
	int t = n;
	
	while (t > 0) {
		int cnt = 0;
		while (cnt < m) {
			if (num[i] != 0) {
				cnt++;
			}
			
			if (cnt < m) {
				i++;
				if (i > n) {
					i = 1;
				}
			}
		}
		printf("%3d", num[i]);
		num[i] = 0;
		t--;
		
		do {
			i++;
			if (i > n) {
				i = 1;
			}
		}while (num[i] == 0 && t > 0);
		
	}
	
	return 0;
	
}

```

### 奇数阶幻方问题

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int s[n][n];
	
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			s[i][j] = 0;
		}
	}
	
	int i = 0;
	int j = (n - 1) / 2;
	
	for (int k = 1; k <= n * n; k++) {
		s[i][j] = k;
		int I = i;
		int J = j;
		i -= 1;
		j += 1;

		if (i < 0) {
			i = n - 1;
		}
		if (j > n - 1) {
			j = 0;	
		}
		if (s[i][j] != 0) {
			i = I + 1;
			j = J;
		}
		
	}
	
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			printf("%4d", s[i][j]);
			if (j == n - 1) {
				printf("\n");
			}
		}
	}
	
	return 0;
}

```

### 统计学生的总分以及各课程的平均分

``` c++
#include <stdio.h>

int main ()
{
	int n, m;
	scanf("%d %d", &n, &m);
	
	char name[n][100];
	int grade[n][m];
	
	int sum[n];
	
	for (int i = 0; i < n; i++) {
		sum[i] = 0;
	}
	
	for (int i = 0; i < n; i++) {
		scanf("%s", name[i]);
		for (int j = 0; j < m; j++) {
			scanf("%d", &grade[i][j]);
			sum[i] += grade[i][j];
		}
	}
	
	for (int i = 0; i < n; i++) {
		printf("%-8s", name[i]);
		printf("%6d", sum[i]);
		for (int j = 0; j < m; j++) {
			printf("%6d", grade[i][j]);
		}
		printf("\n");
	}
	
	double aver[m];
	
	for (int i = 0; i < m; i++) {
		aver[i] = 0;
	}
	
	for (int i = 0; i < m; i++) {
		for (int j = 0; j < n; j++) {
			aver[i] += grade[j][i];
		}
		aver[i] /= n;
	}
	
	printf("average score:");
	
	for (int i = 0; i < m; i++) {
		printf("%6.1f", aver[i]);
 	}	
	
	return 0;
	
}

```

### 统计学生成绩的最高最低分以及超过平均分的人数

``` c++
#include <stdio.h>

int main () 
{
	
	int n;
	scanf("%d", &n);
	
	int grade[n];
	double aver = 0;
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &grade[i]);
		aver += grade[i];
	}
	
	aver /= n;
	
	int cnt = 0;
	
	for (int i = 0; i < n; i++) {
		if (grade[i] > aver) {
			cnt++;
		}
	}
	
	int min = grade[0];
	
	for (int i = 1; i < n; i++) {
		if (grade[i] < min) {
			min = grade[i];
		}
	}
	
	int max = grade[0];
	
	for (int i = 1; i < n; i++) {
		if (grade[i] > max) {
			max = grade[i];
		}
	}
	
	printf("%d %d %d", max, min, cnt);
	
	return 0;
}

```

### 进制转换

``` c++
#include <stdio.h>

int main ()
{
	char str[100];
	
	int num = 0;
	int i = 0;
	char c;
	
	while ((c = getchar()) != '#') {
		if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'F') || (c >= 'a' && c <= 'f')) {
			str[i++] = c;
			num *= 16;
			if (c >= '0' && c <= '9') {
                num += c - '0';
            }else if (c >= 'A' && c <= 'F') {
                num += c - 'A' + 10;
            }else if (c >= 'a' && c <= 'f') {
            	num += c - 'a' + 10;
			}
		}
	}
	
	str[i] = '\0';
	
	printf("String:%s\n", str);	
	printf("number=%d", num);
	
	return 0;
	
}

```

### 求最大字符串

``` c++
#include <stdio.h>
#include <string.h>

int main ()
{
	int n;
	scanf("%d", &n);
	getchar();
	
	char str[n][100];
	
	for (int i = 0; i < n; i++) {
		gets(str[i]);
	}
	
	int maxI = 0;
	
	for (int i = 1; i < n; i++) {
		if (strcmp(str[i], str[maxI]) > 0) {
			maxI = i;
		}
	}
	
	printf("%s", str[maxI]);
	
	return 0;
	
}

```

### 字符串首尾相连

``` c++
#include <stdio.h>
int main() {
    char str1[101],str2[101];
    int i,j;

    gets(str1);
    gets(str2);
  // Here is your code
    i = 0;
    while (str1[i] != '\0' && str1[i] != '\n') {
        i++;
    }
    str1[i] = '\0'; 
    
    j = 0;
	while (str2[j] != '\0' && str2[j] != '\n') {
        j++;
    }
    str2[j] = '\0';
    
	for (int k = 0; k < j; k++) {
        str1[i] = str2[k];
        i++;
    }
    str1[i] = '\0';

  puts(str1);
  return 0;
}

```

### 统计各数字出现的次数

``` c++
#include <stdio.h>

int main ()
{
	char c;
	int num[10] = {0};
	
	while (c != '!'){
		scanf("%c", &c);
		if (c >= '0' && c <= '9') {
			num[c - '0']++;
		}
	}
	
	for (int i = 0; i < 10; i++) {
		if (i == 9) {
			printf("The character %d appears %d times", i, num[i]);
		}else {
			printf("The character %d appears %d times\n", i, num[i]);
		}
	}
	
	return 0;
	
}


```

### 找出二维数组中的最小元素

``` c++
#include <stdio.h>

int main ()
{
	int m, n;
	scanf("%d %d", &m, &n);
	
	int a[m][n];
	
	for (int i = 0; i < m; i++) {
		for (int j = 0; j < n; j++) {
			scanf("%d", &a[i][j]);
		}
	}
	
	printf("before:\n");
	
	for (int i = 0; i < m; i++) {
		for (int j = 0; j < n; j++) {
			printf("%4d", a[i][j]);
		}
		printf("\n");
	}
	
	printf("after:\n");
	
	int min =a[0][0];
	
	int I = 0;
	int J = 0;
	
	for (int i = 0; i < m; i++) {
		for (int j = 0; j < n; j++) {
			if (a[i][j] < min) {
				min = a[i][j];
				I = i;
				J = j;
			}
		}
	}
	
	for (int j = 0; j < n; j++) {
		int t = a[m - 1][j];
		a[m - 1][j] = a[I][j];
		a[I][j] = t;
	}
	
	int mask = 0;
	
	for (int i = 0; i < m; i++) {
		for (int j = 0; j < n; j++) {
			printf("%4d", a[i][j]);
		}
		if (i != m - 1) {
			printf("\n");
		}
	}
	
	return 0;
}

```

### 矩阵转置

``` c++
#include <stdio.h>

int main ()
{
	int n, m;
	scanf("%d %d", &n, &m);
	
	int a[n][m];
	
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			scanf("%d", &a[i][j]);
		}
	}
	
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			if (j == m - 1) {
				printf("%d", a[i][j]);
			}else {
				printf("%d ", a[i][j]);
			} 
		}
		printf("\n");
	}
	
	int b[m][n];
	
	for (int i = 0; i < m; i++) {
		for (int j = 0; j < n; j++) {
			b[i][j] = a[j][i];
			if (j == n - 1) {
				printf("%d", b[i][j]);
			}else {
				printf("%d ", b[i][j]);
			} 
		}
		printf("\n");
	}	
	
	return 0;
		
}

```

### 二分查找

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int num[n];
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &num[i]);
	}
	
	int res;
	scanf("%d", &res);
	
	int a = 0;
	int b = n - 1;
	
	int mask = 0;
	
	while (a <= b) {
		
		int mid = a + (b - a) / 2;
		
		if (num[mid] == res) {
			printf("%d", mid);
			mask = 1;
			break;
		}else if (num[mid] < res) {
			a = mid + 1;
		}else {
			b = mid - 1;
		}
	}
	
	if (mask == 0) {
		printf("Not found");
	}
	
	return 0;
	
}

```

### 冒泡排序

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int num[100];
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &num[i]);
	}
	
	for (int i = 0; i < n - 1; i++) {
		for (int j = 0; j < n - 1 - i; j++) {
			if (num[j] > num[j + 1]) {
				int t = num[j];
				num[j] = num[j + 1];
				num[j + 1] = t;
			}
		}
	}
	
	for (int i = 0; i < n; i++) {
		printf("%d", num[i]);
		if (i != n - 1) {
			printf(" ");
		} 
	}
	
	return 0;
	
}

```

## 第六章2

### 大写改小写

``` c++
#include <stdio.h>

int main ()
{
	char ch;
	while (scanf("%c", &ch) != EOF && ch != '\n') {
		if (ch >= 'A' && ch <= 'Z') {
			ch += 32;
		}
		putchar(ch);
	}
	
	return 0;
	
}

```

### 串比较

``` c++
#include <stdio.h>

int main ()
{
	char str1[101];
	gets(str1);
	
	char str2[101];
	gets(str2);
	
	int i = 0;
	
	while (str1[i] != '\0' && str2[i] != '\0' && str1[i] == str2[i]) {
		i++;
	}
	
	printf("%d", str1[i] - str2[i]);
	
	return 0;
}


```

### 串复制

``` c++
#include <stdio.h>
int main() {
	char str1[101],str2[101];
	int i;
	gets(str1);
	// Please fill this blank
	for (i = 0; str1[i] != '\0'; i++) {
		str2[i] = str1[i]; 
	}
	str2[i] = '\0';
	
	puts(str2);
	return 0;
}

```

### 逆向输出字符串

``` c++
#include <stdio.h>

int main () 
{
	char str1[101],str2[101];
	int i,j;
	gets(str1);
	// Please fill this blank
	int l = 0;
	while (str1[l] != '\0') {
		l++;
	}
	for (i = 0, j = l - 1; j >= 0; i++, j--) {
		str2[i] = str1[j];
	}
	
	str2[l] = '\0';
	
	puts(str2);
	return 0;
}

```

### 对方阵做统计处理

``` c++
#include <stdio.h>

void Traverse(int n, int s[n][n])
{
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			scanf("%d", &s[i][j]);
		}
	}
}

int sumD(int n, int s[n][n])
{
	int sum = 0;
	
	for (int i = 0; i < n; i++) {
		sum += s[i][i];
	}
	
	for (int i = 0; i < n; i++) {
		sum += s[n - 1 - i][i];
	}
	
	if (n % 2 != 0) {
		sum -= s[(n - 1) / 2][(n - 1) / 2];
	}
	
	return sum;
	
}

int multiple(int n, int s[n][n])
{
	int m = 1;
	
	for (int i = 0; i < n; i += 2) {
		m *= s[i][i]; 
	}
	
	for (int j = 0; j < n; j += 2) {
		if ((n - 1 - j) % 2 == 0) {
			m *= s[n - 1 - j][j];
		} 
	}
	
	return m;
	
}

int main ()
{
	int n;
	scanf("%d", &n);
	
	int s[n][n];
	Traverse(n, s);
	
	printf("%d %d\n", sumD(n, s), multiple(n,s));
	
	int p[n][n];
	
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			p[j][n - 1 - i] = s[i][j];
		}
	}
	
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			printf("%d", p[i][j]);
			if (j < n - 1) {
				printf(" ");
			}
		}
		if (i < n - 1) {
			printf("\n");
		}
	}
	
	return 0;
	
}

```

### 兔子和狐狸

``` c++
#include <stdio.h>

int main () 
{
	int n, m;
	scanf("%d %d", &n, &m);
	
	int h[n + 1];
	
	for (int i = 0; i <= n; i++) {
		h[i] = 1;
	}
	
	h[0] = 0;
	h[1] = 0;
	
	int i = 2;
	int j = 1;
	int s = 1;
	
	while (s <= m * n) {
		j += i;
		s += i;
		i++;
		if (s > m * n) {
			break;
		}
		if (j > n) {
			j %= n;
			if (j == 0) {
				j = n;
			}
		}
		h[j] = 0;
	}
	
	int mask = 1;
	
	for (int i = 0; i <= n; i++) {
		if (h[i] == 1) {
			if (mask == 1) {
				printf("%d", i);
				mask = 0;
			}else {
				printf(" %d", i);
			}
		}
	}
	
	if (mask == 1) {
		printf("No choice");
	}
	
	return 0;
	
}

```

### 删除字符串中指定字符

``` c++
#include <stdio.h>

int main ()
{
	char str[101];
	gets(str);
	
	char ch;
	scanf("%c", &ch);
	
	int j = 0;
	
	for (int i = 0; str[i] != '\0'; i++) {
		if (str[i] != ch) {
			str[j++] = str[i];
		}
	}
	str[j] = '\0';
	
	printf("%s", str);
	
	return 0;
}

```

### 奇偶数分开排序

``` c++
#include <stdio.h>

void sorting (int num[], int n) 
{
	for (int i = n - 1; i > 0; i--) {
		int tag = i;
		for (int j = i - 1; j >= 0; j--) {
			if (num[tag] < num[j]) {
				tag = j;
			}
		}
		int t = num[i];
		num[i] = num[tag];
		num[tag] = t;
	}
}

void print (int num[], int n) 
{
	int mask = 1;
	
	for (int i = 0; i < n; i++) {
		if (mask == 1) {
			printf("%d", num[i]);
			mask = 0;
		}else {
			printf(" %d", num[i]);
		}
	}
}

int main ()
{
	int n;
	scanf("%d", &n);
	
	int num[n];
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &num[i]);
	}
	
	int odd[n];
	int even[n];
	
	int cnt1 = 0;
	int cnt2 = 0;
	
	for (int i = 0; i < n; i++) {
		if (num[i] % 2 == 1) {
			odd[cnt1] = num[i];
			cnt1++;
		}else {
			even[cnt2] = num[i];
			cnt2++;
		}
	}
	
	sorting(odd, cnt1);
	sorting(even, cnt2);
	
	print(odd, cnt1);
	printf(" ");
	print(even, cnt2);
	
	return 0;
	
}

```

### 选择排序

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int num[n];
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &num[i]);
	}
	
	for (int i = n - 1; i > 0; i--) {
		int tag = i;
		for (int j = i - 1; j >= 0; j--) {
			if (num[tag] < num[j]) {
				tag = j;
			}
		}
		int t = num[i];
		num[i] = num[tag];
		num[tag] = t;
	}
	
	for (int i = 0; i < n; i++) {
		printf("%d ", num[i]);
	}
	
	return 0;
	
} 

```

### 杨辉三角形

``` c++
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int a[31][31] = {0};
    
    // 构造杨辉三角
    for (int i = 0; i < n; i++) {
        a[i][0] = a[i][i] = 1;
        for (int j = 1; j < i; j++) {
            a[i][j] = a[i-1][j-1] + a[i-1][j];
        }
    }

    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            printf("%10d", a[i][j]);
        }
        printf("\n");
    }
    return 0;
}

```

### 在有序数组中插入一个数

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int num[n + 1];
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &num[i]);
	}
	
	int m;
	scanf("%d", &m);
	
	num[n] = m;
	
	for (int i = n - 1; i >= 0; i--) {
		if (num[i] > num[i + 1]) {
			int t = num[i + 1];
			num[i + 1] = num [i];
			num[i] = t;
		}else {
			break;
		}
	}
	
	int mask = 1;
	
	for (int i = 0; i <= n; i++) {
		if (mask == 1) {
			printf("%d", num[i]);
			mask = 0;
		}else {
			printf(" %d", num[i]);
		}
	}
	
	return 0;
	
}

```

### 筛法求素数

``` c++
#include <stdio.h>

int main () 
{
	int n;
	scanf("%d", &n);
	
	int Prime[n + 1];
	
	for (int i = 2; i <= n; i++) {
		Prime[i] = 1;
	}
	
	for (int i = 2; i <= n; i++) {
		if (Prime[i] == 1) {
			for (int k = i * i; k <= n; k += i) {
				Prime[k] = 0;
			}
		}
	}

	int mask = 1;
	
	for (int i = 2; i <= n; i++) {
		if (Prime[i] != 0) {
			if (mask == 1) {
				printf("%d", i);
				mask = 0;
			}else {
				printf(" %d", i);
			}
		}
	}
	
	return 0;
	
}

```

### 最长对称子串

``` c++
#include <stdio.h>

int main ()
{
	char s[1001];
	gets(s);
	
	int length_I = 1;
	
	for (int i = 1; s[i] != '\0'; i++) {
		
		int length_i = 1;
		
		for (int j = 1; s[i + j] == s[i - j] && i - j >= 0; j++) {	
			length_i += 2;
		}
		
		if (length_i > length_I) {
			length_I = length_i;
		}
		
	}
	
	int length_J = 0; 
	
	for (int i = 0; s[i] != '\0'; i++) {
		
		int length_j = 0;
		
		for (int j = 1; s[i + 1 - j] == s[i + j] && i + 1 - j >= 0; j++) {
			length_j += 2;
		}
		
		if (length_j > length_J) {
			length_J = length_j;
		} 
	}
	
	if (length_J > length_I) {
		printf("%d", length_J);
	}else {
		printf("%d", length_I);
	}
	
	return 0;
	
}


```

### 装睡的人

``` c++
#include <stdio.h>

int main() {
    int N;
    scanf("%d", &N);
    char name[4]; 
    int breath, pulse;
    
    for (int i = 0; i < N; i++) {
        scanf("%s %d %d", name, &breath, &pulse);
        if (breath < 15 || breath > 20 || pulse < 50 || pulse > 70) {
            printf("%s\n", name);
        }
    }
    return 0;
}

```

## 第六章3

### 个位数统计

``` c++
#include <stdio.h>
#include <string.h>

int main() {
    char N[1005];
    int count[10] = {0};
    
    scanf("%s", N);
    
    for (int i = 0; i < strlen(N); i++) {
        int d = N[i] - '0';
        count[d]++;
    }

    for (int d = 0; d <= 9; d++) {
        if (count[d] > 0) {
            printf("%d:%d\n", d, count[d]);
        }
    }
    return 0;
}

```

### 找出不是两个数组共有的元素

``` c++
#include <stdio.h>

void find(int m, int n, int a[m], int b[n], int s[42])
{
	int cnt = 0;
	
	for (int i = 0; i < m; i++) {
		
		int mask = 0;
		for (int j = 0; j < n; j++) {
			if (a[i] == b[j]) {
				mask = 1;
				break;
			}
		}
		if (mask == 0) {
			s[cnt++] = a[i];
		}
	}
	
	for (int i = 0; i < n; i++) {
		
		int mask = 0;
		for (int j = 0; j < m; j++) {
			if (b[i] == a[j]) {
				mask = 1;
				break;
			}
		}
		if (mask == 0) {
			s[cnt++] = b[i];
		}
	}
}

void printing (int a[42])
{
	int s[42];
	
	for (int i = 0; i < 42; i++) {
		s[i] = -1;
	}
	
	for (int i = 0; i < 42 && a[i] != -1; i++) {
		if (s[i] == -1) {
			printf("%d ", a[i]);
			for (int j = i; j < 42 && a[j] != -1; j++) {
				if (a[j] == a[i]) {
					s[j] = 0;
				}
			}
		}	
	}	
}

int main ()
{
	int n;
	scanf("%d", &n);
	
	int a[n];
	for (int i = 0; i < n; i++) {
		scanf("%d", &a[i]);
	}
	
	int m;
	scanf("%d", &m);
	
	int b[m];
	
	for (int i = 0; i < m; i++) {
		scanf("%d", &b[i]);
	}
	
	int s[42];
	
	for (int i = 0; i < 42; i++) {
		s[i] = -1;
	}
	
	find(n, m, a, b, s);
	
	printing(s);
	
	return 0;
	
} 

```

### 字符串逆序

``` c++
#include <stdio.h>
#include <string.h>

int main ()
{
	char a[81];
	
	fgets(a, sizeof(a), stdin);
	
	int length = strlen(a);
	
	int j = length - 1;
	int i = 0;
	
	while (i < j) {
		char b = a[i];
		a[i] = a[j];
		a[j] = b;
		i++;
		j--;
	}
	
	printf("%s", a);
	
	return 0;
	
}

```

### 找鞍点

``` c++
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int a[6][6];
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &a[i][j]);
        }
    }
    
    for (int i = 0; i < n; i++) {
        int rowMax = a[i][0];
        for (int j = 1; j < n; j++) {
            if (a[i][j] > rowMax) {
                rowMax = a[i][j];
            }
        }
        
        for (int j = 0; j < n; j++) {
            if (a[i][j] == rowMax) {
                int colMin = a[0][j];
                for (int k = 1; k < n; k++) {
                    if (a[k][j] < colMin) {
                        colMin = a[k][j];
                    }
                }
                if (a[i][j] == colMin) {
                    printf("%d %d\n", i, j);
                    return 0;
                }
            }
        }
    }
    
    printf("NONE\n");
    return 0;
}


```

### 求n以内最大的k个素数以及它们的和

``` c++
#include <stdio.h>

void findPrime (int n, int Prime[])
{	
	for (int i = 2; i <= n; i++) {
		Prime[i] = 1;
	}
	
	for (int i = 2; i * i <= n; i++) {
		if (Prime[i] == 1) {
			for (int k = i * i; k <= n; k += i) {
				Prime[k] = 0;
			}
		}
	}
	
	Prime[0] = 0;
	Prime[1] = 0;
}

int main ()
{
	int max, cnt;
	scanf("%d %d", &max, &cnt);
		
	int isPrime[10001];
	findPrime(max, isPrime);
	
	int sum = 0;
	int mask = 0;
	
	for (int i = max; i > 0 && mask < cnt; i--) {
		if (isPrime[i] == 1) {
			sum += i;
			if (mask == 0) {
				printf("%d", i);
			}else {
				printf("+%d", i);
			}
			mask++;
		}
	}
	
	printf("=%d", sum);
	
	return 0;
}

```

### 1234方阵

``` c++
#include <stdio.h>

void printing (int n, int s[n][n])
{
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			printf("%d", s[i][j]);
			if (j < n - 1) {
				printf(" ");
			}
		}
		printf("\n");
	}
}

int main ()
{
	int n;
	scanf("%d", &n);
	
	int s[n][n];
	
	for (int i = 0; i < n; i++) {
		s[i][i] = 0;
	}
	
	for (int i = 0; i < n; i++) {
		s[n - 1 - i][i] = 0;
	}
	
	int cnt = n - 2;
	int k = cnt;
	int l = cnt;
	int J = 1;
	
	for (int i = 0; k > 0; i++) {
		l = k;
		int j = J;
		while (l > 0) {
			s[i][j] = 1;
			l--;
			j++;
		}
		k -= 2;
		J += 1;
	}
	
	cnt = n - 2;
	k = cnt;
	l = cnt;
	int I = 1;
	
	for (int j = 0; k > 0; j++) {
		l = k;
		int i = I;
		while (l > 0) {
			s[i][j] = 2;
			l--;
			i++;
		}
		k -= 2;
		I += 1;
	}
	
	cnt = n - 2;
	k = cnt;
	l = cnt;
	J = 1;
	
	for (int i = n - 1; k > 0; i--) {
		l = k;
		int j = J;
		while (l > 0) {
			s[i][j] = 3;
			l--;
			j++;
		}
		k -= 2;
		J += 1;
	}
	
	cnt = n - 2;
	k = cnt;
	l = cnt;
	I = 1;
	
	for (int j = n - 1; k > 0; j--) {
		l = k;
		int i = I;
		while (l > 0) {
			s[i][j] = 4;
			l--;
			i++;
		}
		k -= 2;
		I += 1;
	}
	
	printing(n, s);
	
	return 0;
	
}

```

### 心情查询

``` c++
#include <stdio.h>

void Traverse1 (int n, int s[n])
{
	for (int i = 0; i < n; i++) {
		scanf("%d", &s[i]);
	}
}

void initialize_Traverse2 (int n, int s[n])
{
	for (int i = 0; i < n; i++) {
		s[i] = -1;
	}
	
	int i = 0;
	int j;
	
	while (i < n - 1 && scanf("%d", &j) == 1) {
		if (j < 0 || j > 23) {
			break;
		}else {
			s[i++] = j;
		}
	}
}

int main ()
{
	const int n = 24;
	
	int s[n];
	Traverse1(n, s);

	int hour[n + 1];
	initialize_Traverse2(n + 1, hour);

	int i = 0;
	
	while (i < n + 1 && hour[i] != -1) {
		
		if (s[hour[i]] > 50) {
			printf("%d Yes", s[hour[i]]);
		}else if (s[hour[i]] <= 50) {
			printf("%d No", s[hour[i]]);
		}
		
		if (s[hour[i + 1]] != -1) {
			printf("\n");
		}else {
			break;
		}
		i++;
	}
	
	return 0;
	
}

```

### 点赞

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int q[1001] = {0};
	
	for (int i = 0; i < n; i++) {
		int p;
		scanf("%d", &p);
		
		for (int j = 0; j < p; j++) {
			int k;
			scanf("%d", &k);
			q[k]++;
		}
		
	}
	
	int max = 1000;
	
	for (int i = 1000; i >= 0; i--) {
		if (q[i] > q[max]) {
			max = i;
		}
	}
	
	printf("%d %d", max, q[max]);
	
	return 0;
}

```

### 古风排版

``` c++
#include <stdio.h>

int ceiling (double num)
{
	int i = (int)num;
	if (num > i) {
		return i + 1;
	}
	return i;
}


int main ()
{
	int n;
	scanf("%d", &n);
	getchar();
	
	char s[1001];
	gets(s);
	
	int len = 0;
	
	while (s[len] != '\0') {
		len++;
	}
	s[len] = '\0';
	
	int column = ceiling((double)len / n);
	
	char c[n][column];
	
	int k = 0;
	
	for (int j = column - 1; j >= 0; j--) {
		for (int i = 0; i < n; i++) {
			if (k < len) {
				c[i][j] = s[k++];
			} else {
				c[i][j] = ' ';
			}
		}
	}
	
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < column; j++) {
			printf("%c", c[i][j]);
		}
		printf("\n");
	}
	
	return 0;
	
}

```

### 字符串A-B

``` c++
#include <stdio.h>

int main ()
{
	char a[10001];
	gets(a);
	char b[10001];
	gets(b);
	
	int c[10001] = {0};
	
	int k = 0;
	
	for (int i = 0; a[i] != '\0'; i++) {
		for (int j = 0; b[j] != '\0'; j++) {
			if (b[j] == a[i] ) {
				c[k++] = i;
				break;
			}
		}
	}
	
	for (int i = 0; a[i] != '\0'; i++) {
		int mask = 1;
		for (int j = 0; j < k; j++) {
			if (i == c[j]) {
				mask = 0;
				break;
			}
		}
		if (mask == 1) {
			printf("%c", a[i]);
		}
	}
	
	return 0;
} 

```

### n个数字都不相同的年份

``` c++
#include <stdio.h>

void initialize_years(int year, int years[4]) 
{
	for (int i = 0; i < 4; i++) {
		years[i] = 0;
	}
	
	int i = 3;
	
	while (year > 0 && i >= 0) {
		years[i] = year % 10; 
		year /= 10;              
		i--;
	}
}

int main ()
{
	int y;
	scanf("%d", &y);

	int s[4];
	
	initialize_years(y, s);
	
	int n;
	scanf("%d", &n);
	
	int cnt = 0;
	
	while (1) {
		int mask = 1;
		int num[10] = {0};
		for (int i = 0; i < 4; i++) {
			int j = 0;
			for ( ; j < 10; ) {
				if (s[i] == j) {
					num[j]++;
					break;
				}else {
					j++;
				}
			}	
		}
		for (int k = 0; k < 10; k++) {
			if (n == 4) {
				if (num[k] != 0 && num[k] != 1) {
					mask = 0;
					break;
				}
			}else if (n == 3) {
				int cnt = 0;
				for (int l = 0; l < 10; l++) {
					if (num[l] == 2) {
						cnt++;
					}
				}
				if (cnt != 1) {
					mask = 0;
					break;
				}
			}else if (n == 2) {
				int tag = 0;
				for (int l = 0; l < 10; l++)
				if (num[l] == 0) {
					tag++;
				}
				if (tag != 8) {
					mask = 0;
					break;
				}
			}
		}
		if (mask == 0) {
			y += 1;
			cnt++;
			initialize_years(y, s);
		}else {
			break;
		}
	}
	
	printf("%d ", cnt);
	
	for (int i = 0; i < 4; i++) {
		printf("%d", s[i]);
	}
	
	return 0;
	
} 

```

### 矩阵A乘以B

``` c++
#include <stdio.h>

int main() {
    int Ra, Ca, Rb, Cb;
    int A[100][100], B[100][100], C[100][100];

    scanf("%d %d", &Ra, &Ca);
    for (int i = 0; i < Ra; i++) {
        for (int j = 0; j < Ca; j++) {
            scanf("%d", &A[i][j]);
        }
    }

    scanf("%d %d", &Rb, &Cb);
    for (int i = 0; i < Rb; i++) {
        for (int j = 0; j < Cb; j++) {
            scanf("%d", &B[i][j]);
        }
    }

    if (Ca != Rb) {
        printf("Error: %d != %d\n", Ca, Rb);
        return 0;
    }

    for (int i = 0; i < Ra; i++) {
        for (int j = 0; j < Cb; j++) {
            C[i][j] = 0;
            for (int k = 0; k < Ca; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    printf("%d %d\n", Ra, Cb);
    for (int i = 0; i < Ra; i++) {
        for (int j = 0; j < Cb; j++) {
            if (j > 0) printf(" ");
            printf("%d", C[i][j]);
        }
        printf("\n");
    }

    return 0;
}

```

### 查验身份证

``` c++
#include <stdio.h>

int main ()
{
	int s[17];
	int a[17] = {7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2};
	
	int i = 0;
	int sum = 0;
	
	while (i < 17 && scanf("%1d", &s[i]) == 1) {
		sum += s[i] *a[i];
		i++;
	}
	
	char b;
	scanf("%c", &b);
	
	sum %= 11;
	
	int z[11] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
	char m[11] = {'1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'};
	
	char mask = '0';
	
	for (int i = 0; i < 11; i++) {
		if (sum == z[i]) {
			mask = m[i];
		}
	}
	
	if (mask == b) {
		printf("No problem");
	}else {
		printf("Incorrect");
	}
	
	return 0;		
}

```

### 判断题的评判

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int AC[n];
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &AC[i]);
	}
	
	int WA[n];
	
	int cnt = 0;
	
	for (int i = 0; i < n; i++) {
		scanf("%d", &WA[i]);
		if (WA[i] == AC[i]) {
			cnt++;
		}
	}
	
	double x;
	
	x = 1.0 * cnt / n;
	
	printf("%.2f%%", x * 100);
	
	return 0;
}

```

### 数组元素循环右移问题

``` c++
#include <stdio.h>

void reverse(int a[], int l, int r) {
	while (l < r) {
		int t = a[l];
		a[l] = a[r];
		a[r] = t;
		l++;
		r--;
	}
}

int main () 
{
	int n, m;
	scanf("%d %d", &n, &m);
	m %= n;
	
	int s[n];
	for (int i = n - 1; i >= 0; i--) {
		scanf("%d", &s[i]);
	}
	
	reverse(s, 0, m - 1);
	reverse(s, m, n - 1);
	
	for (int i = 0; i < n; i++) {
		printf("%d ", s[i]);
	}
	
	return 0;
	
}

```

## 第七章

### 定义print函数，输出n个*

``` c++
void print(int k)
{
	for (int i = 1; i <= k; i++)
		printf("*");
	printf("\n");
}

```

### 定义函数求π的近似值

``` c++
double funpi(double e)
{
	double flag = 1, sum = 0;
	for (int i = 1;; i++)
	{
		double t = flag / (2 * i - 1);
		if (t < 0)
		{
			if (-t < e)
				break;
		}
		else
		{
			if (t < e)
				break;
		}
		sum += t;  //求和
		flag = -flag;  //正负反转
	}
	return sum;
}

```

### 设计函数计算并输出矩形的面积

``` c++
void area(int a, int b)
{
    printf("%d", a * b);
}

```

### 定义函数prime，判定正整数n是否素数

``` c++
#include <math.h>
int prime(int n)
{
	for (int i = 2; i <= sqrt(n); i++)
		if (n % i == 0)
			return 0;

	return 1;
}

```

### 设计函数实现冒泡排序

``` c++
void sort(int a[], int n)
{
	for (int i = 0; i < n - 1; i++)  //一趟冒泡排序,把最小的数字放在最末尾
	{
		for (int j = 0; j < n - i - 1; j++)  //每经过一趟冒泡排序,需要检索的数字个数-1
		{
			if (a[j] < a[j + 1])  //如果左边的数字小于右边的数字,实现相邻两个数的交换
			{
				int t = a[j];
				a[j] = a[j + 1];
				a[j + 1] = t;
			}
		}
	}
}

void print(int a[], int n)
{
	for (int i = 0; i < n; i++)
	{
		if (i == 0)
			printf("%d", a[i]);
		else
			printf(" %d", a[i]);
	}
	printf("\n");
}
```

### 设计函数实现矩阵的转置

``` c++
void convert(int arr1[][10], int arr2[][10], int x, int y)
{
	for (int i = 0; i < x; i++)
		for (int j = 0; j < y; j++)
			arr2[j][i] = arr1[i][j];  // 矩阵行列坐标互换
}

void print(int arr[][10], int x, int y)  //二维数组的行可以不初始化,列一定要初始化
{
	for (int i = 0; i < x; i++)  //控制行数
	{
		for (int j = 0; j < y; j++)  //控制列数
		{
			if (j == 0)
				printf("%d", arr[i][j]);
			else
				printf(" %d", arr[i][j]);
		}
		printf("\n");
	}
}
```

### 设计函数实现二分查找

``` c++
int BinSearch(int a[], int n, int x)
{
	int left = 0;  //数组最左侧元素下标
	int right = n - 1;  //数组最右侧元素下标
	while (left <= right)
	{
		//int mid = (right + left) / 2;
		int mid = left + (right - left) / 2;  //防止数据过大，越界
		if (x < a[mid])
			left = mid + 1;
		else if (x > a[mid])
			right = mid - 1;
		else
			return mid;
	}
	return -1;
}
```

### 定义menu函数，输出菜单选项

``` c++
void Menu()
{
	printf("       Menu\n");
	printf("  (1)--读取数据\n");
	printf("  (2)--数据计算\n");
	printf("  (3)--查找数据\n");
	printf("  (4)--输出数据\n");
	printf("  (0)--退出程序\n");
}
```

### 设计函数计算学生的平均成绩

``` c++
double average(int a[], int n)
{
	double sum = 0;
	for (int i = 0; i < n; i++)
		sum = sum += a[i];
	return  sum / n;
}
```

### 设计递归函数模拟汉诺塔游戏

``` c++
void move(int n, char a, char b, char c)
{
	if (n == 1)
		printf("%c-->%c\n", a, c);  //当只有一个盘子时,直接从起始柱移到目标柱
	else
	{
		move(n - 1, a, c, b);  //第一步:将n-1个盘子由a移动到b,注意此时起始柱是a,中转柱是c,目标柱是b; 
		printf("%c-->%c\n", a, c);  //第二步:将第n个盘子从起始柱移到目标柱
		move(n - 1, b, a, c);  //第三步:将n-1个盘子由b移动到c,注意此时起始柱是b,中转柱是a,目标柱是c; 
	}
}
```

### 设计递归函数计算Fibonacci数列的第n项

``` c++
int fib(int n)
{
	if (n <= 1)
		return 1;
	else
		return fib(n - 1) + fib(n - 2);
}
```

### 设计递归函数计算组合

``` c++
int fun(int m, int n)
{
	if (n == 0 || n == m)  //c(0,m)和c(m,m)都为1(特判)
		return 1;
	else
		return fun(m - 1, n - 1) + fun(m - 1, n);  //组合数公式 c(n,m)=c(n-1,m-1)+c(n-1,m)  m>=n
}
```

### 设计递归函数计算两个整数的最大公约数

``` c++
int gcd(int m, int n)  //辗转相除法
{
    if (n == 0)
        return m;
    else
        return gcd(n, m % n);
}
```

### 设计递归函数计算n！

``` c++
int fac(int n)
{
	if (n <= 1)
		return 1;
	else
		return n * fac(n - 1);
}
```

### 设计max函数，计算三个整数的最大值

``` c++
int max(int a, int b, int c)
{
	if (a >= b && a >= c)
		return a;
	if (b >= a && b >= c)
		return b;
	if (c >= a && c >= b)
		return c;
}
```

