---
title: "C语言作业答案(上)"
published: 2026-01-07
description: "整理 C 语言作业上半部分的参考答案，方便复习与查阅。"
tags: ["C语言", "作业", "答案"]
category: "C 语言"
draft: false
---
# C语言作业答案(上)

临近期末，打开oj，一笔没动，怎么办！

不用担心。这里有人经历过。为了不让更多的人经历如此磨难，现有答案供君参考。

若答案顺序与作业顺序不同，可联系笔者！

<!-- more -->

下给出笔者邮箱：2279839810@qq.com

## 第一章
	
### 求圆的面积和周长

``` c++

#include <stdio.h>

int main()
{
	double r;
	double s, c;
	const double K=3.140000;
	
	scanf("%lf", &r);
	
	s=K*r*r;
	c=2*K*r;
	
	printf("%lf\n%lf", s, c);
	
	return 0;
}

```


### 求2个整数的和

``` c++

#include <stdio.h>

int main()
{
	int a, b;
	
	scanf("%d %d", &a, &b);
	
	int c=a+b;
	
	printf("%d",c);
	
	return 0;
}


```

### 输出2行信息

``` c++

#include <stdio.h>

int main()
{
	printf("Programing is fun.\n");
	printf("Programing in language C is even more fun!");
}


```

### Hello World!

``` c++

#include <stdio.h>

int main()
{
	printf("Hello World!");
	
	return 0;
} 

```

### 设计函数求2个整数的最大值

``` c++

int max (int x, int y) {
    if (x >= y) {
        return x;
    } else {
        return y;
    }
}
```

### 求2个整数的最大值

``` c++

#include <stdio.h>

int main()
{
	int a, b, max;
	
	scanf("%d %d", &a, &b);
	
	if (a>b) max=a;
	else max=b;
	
	printf("max=%d",max);
	
	return 0;
}

```

### This is a C program

``` c++

#include <stdio.h>

int main()
{
	printf("This is a C program");
	
	return 0;
}

```

## 第二章

### 猫是液体

``` c++

#include <stdio.h>

int main ()
{
	int a, b, c;
	scanf("%d %d %d", &a, &b, &c);
	
	int v = a * b * c;
	
	printf("%d", v);
	
	return 0;
}

```

### 中英长度单位换算

``` c++

#include <stdio.h>

int main()
{
	int cm, foot, inch;
	
	scanf("%d", &cm);
	
    int t=cm/30.48;
	
	double n=cm/30.48;
	
	foot=t;
	
	inch=(n-t)*12;
	
	printf("%d %d", foot, inch)	;
	
	return 0;
}

```

### 打妖怪

``` c++

#include <stdio.h>

int main()
{
	int a, b, c;
	
	scanf("%d %d", &a, &b);
	
	int rem=a%b;
	int t=a/b;
	
	if (rem==0)
	   printf("%d", t);
	   
	else 
	   printf("%d", t+1);
	
	return 0;
	
}

```

### 求整数均值

``` c++

#include <stdio.h>

int main()
{
	int a, b, c, d;
	
	scanf("%d %d %d %d", &a, &b, &c, &d);
	
	int sum=a+b+c+d;
	double aver=(a+b+c+d)/4.00;
	
	printf("Sum = %d\nAverage = %.2f", sum, aver);
	
	return 0;
}


```

### 整数四则运算

``` c++

#include <stdio.h>

int main()
{
	int a, b;
	
	scanf("%d %d", &a, &b);
	
	printf("%d + %d = %d\n", a, b, a+b); 
	printf("%d - %d = %d\n", a, b, a-b);
	printf("%d * %d = %d\n", a, b, a*b);
	printf("%d / %d = %d", a, b, a/b);
		   
	return 0;	   
}

```

### 分糖果

``` c++

#include <stdio.h>

int main ()
{
	int x, y, z;
	scanf("%d %d %d", &x, &y, &z);
	
	int a = x / 3;
	x = a;
	y += a;
	z += a;
	
	int b = y / 3;
	x += b;
	y = b;
	z += b;
	
	int c = z / 3;
	x += c;
	y += c;
	z = c;
	
	printf("%d %d %d", x, y, z);
	
	return 0;
}

```

### 自由落体

``` c++

#include <stdio.h>

int main ()
{
	int t;
	scanf("%d", &t);
	
	int h = 10 * t * t / 2;
	
	if (h > 2000) {
		printf("2000");
	}else {
		printf("%d", h);
	}
	
	return 0;
}

```

### 计算终止时间

``` c++

#include <stdio.h>
#include <stdlib.h>

int main () 
{
    char str[4];
    double num;
    int a;
    
    scanf("%s %d", &str, &a);
    
    num = atof(str);
    
    int NUM = num;
    
    int min = NUM % 100;
    int hour = NUM / 100;
    
    int res = a + min;
    
    if (res >= 60) {
    	int temp = res / 60;
    	hour += temp;
    	res -= temp * 60;
	}else if (res < 0) {
		res = -res;
		int temp = res / 60;
		hour -= temp + 1;
		res -= temp * 60;
		res = 60 - res;
	}
	
	if (res >= 60) {
    	int temp = res / 60;
    	hour += temp;
    	res -= temp * 60;
    }

	printf("%d%02d", hour, res);

    return 0;
}

```

### 输出四位整数的各位数字

``` c++

#include <stdio.h>

int main()
{
	int num;
	
	scanf("%d", &num);
	
	int a=num/1000, 
	    b=num/100-a*10, 
	    c=num/10-a*100-b*10,
	    d=num-a*1000-b*100-c*10;
	
	printf("%d=%d+%d*10+%d*100+%d*1000", num, d, c, b, a);
	
	return 0;
} 

```

### 两小时学完C语言

``` c++

#include <stdio.h>

int main()
{
	int n, k ,m;
	
	scanf("%d %d %d", &n, &k, &m);
	
	int remain=n-k*m;
	
	printf("%d", remain);
	
	return 0;
}

```

### 计算图形面积

``` c++

#include <stdio.h>

int main()
{
	int a, b;
	
	scanf("%d %d", &a, &b);
	
	int s=abs(50*a-50*b);
	
	printf("%d", s);
	
	return 0;
}

```

### 折扣

``` c++

#include <stdio.h>

int main()
{
	int ori, dis;
	
	scanf("%d %d", &ori, &dis);
	
	double final=ori*dis/10.00;
	
	printf("%.2f", final);
	
	return 0;
}


```

### 标准体重和身高的对应关系

``` c++

#include <stdio.h>

int main()
{
	int h=0;
	
	scanf("%d", &h);
	
	double m=(h-100)*0.9*2;
	
	printf("%.1f", m);
	
	return 0;
}

```

### 后天

``` c++

#include <stdio.h>

int main()
{
	int D=0;
	
	scanf("%d", &D);
	
	D+=2;
	
	if(D>7) D-=7;
	
	printf("%d", D);
	
	return 0;
} 

```

## 第三章

### 字母对应的ASCII 码

``` c++

#include <stdio.h>

int main()
{
	char ch;
	
	scanf("%c", &ch);
	
	printf("%d", ch);
	
	return 0;
}

```

### 温度转换

``` c++

#include <stdio.h>

int main()
{
	double f=0;
	
	scanf("%lf", &f);
	
	double c=5.0/9.0*(f-32);
	
	printf("%lf", c);
	
	return 0;
}

```

### 计算圆的周长

``` c++

#include <stdio.h>

int main()
{
	double r;
	double K=3.14;
	
	scanf("%lf", &r);
	
    double c=2*K*r;
    
    printf("%lf", c);
    
    return 0;
}

```

### 求三位整数的逆序数

``` c++

#include <stdio.h>

int main()
{
	int num = 0;
	int result = 0;
	int digital = 0;
	
	scanf("%d", &num);
	
	while (num > 0){
		digital = num % 10;
		result = result * 10 + digital; 
		num /= 10;
	}
	
	printf("%03d", result);
	
	return 0;
}

```

### 求三角形面积

``` c++

#include <stdio.h>
#include <math.h>

int main()
{
    double a, b, c;
    
    scanf("%lf %lf %lf", &a, &b, &c);
    
    double p = (a + b + c) / 2;
    
    double s = sqrt(p * (p - a) * (p - b) * (p - c));
    
    printf("%.2f", s);
    
    return 0;
}

```

### 计算浮点数相除的余数

``` c++

#include <stdio.h>

int main()
{
	double a, b;
	
	scanf("%lf %lf", &a, &b);
	
	int k=0;
    double tag=0.0;
    double n=0.0;
    
    do{
    	n=a-k*b;
    	k++;
	}while (n>=0);
	
	double r=n+b;
	
	printf("%g", r);
	
	return 0;
}

```

### 年增长率

``` c++

#include <stdio.h>
#include <math.h>

int main()
{
	int n;
	
	scanf("%d", &n);
	
	double x=pow(2.0, 1.0/n);
	
	double res=(x-1.0)*100;
	
	printf("%.2f%%", res);
	
	return 0;
}


```

### 快速求和

``` c++

#include <stdio.h>

int main()
{
	int n;
	
	scanf("%d", &n);
	
	int tag;
	double s=0.0;
	
	for (tag=1; tag<=n; tag++){
		s+=1.0/(tag*(tag+1.0));
	}
	
	printf("%.5f", s);
	
	return 0;
}

```

### 混合类型数据格式化输入

``` c++

#include <stdio.h>

int main()
{
	double a, b;
	int c;
	char d;
	
	scanf("%lf %d %c %lf", &a, &c, &d, &b);
	
	printf("%c %d %.2f %.2f", d, c, a, b);
	
	return 0;
}


```

### 定期存款

``` c++

#include <stdio.h>

int main()
{
	double a, b;
	
	scanf("%lf %lf", &a, &b);
	
	double res1=a*b/100.0;
	
	double res2=res1+a;
	
	printf("%11.2f\n%11.2f\n%11.2f", a, res1, res2);
	
	return 0;
}

```

### 日期格式变化

``` c++

#include <stdio.h>

int main()
{
	int m, d, y;
	
	scanf("%d-%d-%d", &m, &d, &y);
	
	printf("%02d-%02d-%02d", y, m, d);
	
	return 0;
}

```

### 水果店收款

``` c++

#include <stdio.h>

int main()
{
	double a, b, c, d;
	
	scanf("%lf %lf %lf %lf,", &a, &b, &c, &d);
	
	double p=2.5*a+1.7*b+2*c+1.2*d;
	
	printf("%.2f", p);
	
	return 0;
}

```

### 计算房间面积

``` c++

#include <stdio.h>

int main()
{
	double a, b;
	
	scanf("%lf\n%lf", &a, &b);
	
	double c=a*b;
	
	printf("the area of the room:%lf", c);
	
	return 0;
}


```

## 第四章

### 三天打鱼两天晒网    

``` c++

#include <stdio.h>

int main()
{
	int n;
	scanf("%d", &n);
	
	int tag = n % 5;
	
	switch (tag) {
		case 1:
		case 2:
		case 3:
			printf("Fishing in day %d", n);
		    break;
		    
		default:
			printf("Drying in day %d", n);
	}
	
	return 0;
	
}


```

### 闰年   

``` c++

#include <stdio.h>

int main()
{
	int yr;
	scanf("%d", &yr);
	
	int mask1 = yr%400;
	int lpyr = 0;
	
	int mask2 = yr%4;
	int mask3 = yr%100;
	
	if (mask1 == 0) {
		lpyr = 1;
	}else {
		if (mask2 == 0) {
			if (mask3 != 0 ){
				lpyr = 1;
			}
		}
	}
	
	if (lpyr == 1) {
		printf("%d is a leap year!", yr);
	}else {
		printf("%d isn't a leap year!", yr);
	}
	
	return 0;
	
}



```

### 三个整数排序  

``` c++

#include <stdio.h>

int main()
{
	int a, b, c;
	scanf("%d %d %d", &a, &b, &c);
	
	int num1, num2, num3;
	
	if (a > b) {
		if (a > c){
			num1 = a;
			if (b > c){
			    num2 = b, num3 = c;
		    }else {
			    num2 = c, num3 = b;
		        }
	        }else {
	        num1 = c, num2 = a, num3 = b;
			} 
		
	}else{
		if (b > c){
			num1 = b;
			if (a > c){
				num2 = a, num3 = c;
			}else {
				num2 = c, num3 = a;
			}
		}else{
			num1 = c, num2 = b, num3 = a;
		}
	}
	
	printf("a=%d,b=%d,c=%d", num3, num2, num1);
	
	return 0;
}

```

### 判断水仙花数 

``` c++

#include <stdio.h>

int main()
{
	int num;
	scanf("%d", &num);
	
	int a, b, c;
	a = num / 100;
	b = num / 10 - a * 10;
	c = num - a * 100 - b * 10;
	
	int A = 1;
	int B = 1;
	int C = 1;
	
	int cnt = 0;
	
	
	do {
		A *= a;
		B *= b;
		C *= c;
		
		cnt++;
		
	}while (cnt != 3);
	
	int res;
	res = A + B + C;
	
	if (res == num) {
		printf("YES");
		
	}else {
		printf("NO");
	}
	
	return 0;
	
}


```

### 计算奖金

``` c++

#include <stdio.h>

int main()
{
	double p;
	scanf("%lf", &p);
	
	double bonus;
	
	if (p <= 100000) {
		bonus = p * 0.10;

	}else if (p > 100000 && p <= 200000) {
		bonus = 10000 + (p - 100000) * 0.075;

	}else if (p > 200000 && p <= 400000) {
		bonus = 17500 + (p - 200000) * 0.05;

	}else if (p > 400000 && p <= 600000) {
		bonus = 27500 + (p - 400000) * 0.03;

	}else if (p > 600000 && p <= 1000000) {
		bonus = 33500 + (p - 600000) * 0.015; 

	}else if (p > 1000000) {
		bonus = 39500 + (p - 1000000) * 0.01; 
	
	}//恶心 
	
	printf("%.2f", bonus);
	
	return 0;
}


```

### 按公式计算y和z的值

``` c++

#include <stdio.h>
#include <math.h>

int main()
{
	double x = 0.0;
	scanf ("%lf", &x);
	
	double y, z;
	
	if (x >= 1 && x < 2) {
		y = x * x + 1.0;
		z = 3.0 * x + 5.0;
	}else if (x >= 2 && x <= 2.5) {
		y = x * x + 1.0;
		z = 2.0 * sin(x) - 1.0;
	}else if (x > 2.5 && x < 3) {
		y = x * x - 1.0;
		z = 2.0 * sin (x) - 1.0;
	}else if (x >= 3 && x < 5) {
		y = x * x - 1.0;
		z = sqrt (1.0 + x * x);
	}else if (x >= 5 && x < 8) {
		y = x * x - 1.0;
		z = x * x - 2 * x + 5;
	}
	
	printf("%lf\n%lf", y, z);
	
	return 0;
}

```

### 24小时时间记法转12小时时间记法

``` c++

#include <stdio.h>

int main()
{
	int hor, min, sec;
	scanf("%d %d %d", &hor, &min, &sec);
	
	if (hor >= 12) {
		printf("%d %d %d PM", hor-12, min, sec);
	}else {
		printf("%d %d %d AM", hor, min, sec);
	}
	
	return 0;
	
}

```

### 能否构成三角形

``` c++

#include <stdio.h>

int main()
{
	int a, b, c;
	scanf("%d %d %d", &a, &b, &c);
	
	if (a+b > c && a+c > b && b+c > a) {
		printf("YES");
	}else {
		printf("NO");
	}
	
	return 0;
}


```

### 找出3个整数居中的整数

``` c++

#include <stdio.h>

int main()
{
	int a, b, c;
	scanf("%d %d %d", &a, &b, &c);
	
	int res;
	
	if (a > b) {
		if (b > c) {
			res = b;
		}else if (a > c) {
			res = c;
		}else {
			res = a;
		}
	}else if (a > c) {
		res = a;
	}else if (b > c) {
		res = c;
	}else {
		res = b;
	}
	
	printf("%d", res);
	
	return 0;
}



```

### 学生成绩评定

``` c++

#include <stdio.h>

int main()
{
	int scr;
	scanf("%d", &scr);
	
	if (scr > 85) {
		printf("very good");
	}else if (scr <= 85 && scr >= 60) {
		printf("good");
	}else {
		printf("no good");
	}
	
	return 0;
	
}

```

### 求月份对应的英文名称及天数

``` c++

#include <stdio.h>

int main()
{
	int mth;
	scanf("%d", &mth);
	
	switch ( mth ) {
		case 1:
			printf("January,31");
			break;
		
		case 2:
			printf("February,28/29");
			break;
			
		case 3:
			printf("March,31");
			break;
	
		case 4:
            printf("April,30");
            break;

		case 5:
			printf("May,31");
			break;

		case 6:
			printf("June,30");
			break;

		case 7:
			printf("July,31");
			break;

		case 8:
			printf("August,31");
			break;

		case 9:
			printf("September,30");
			break;

		case 10:
			printf("October,31");
			break;

		case 11:
			printf("November,30");
			break;

		case 12:
			printf("December,31");
			break;	
			
	}
	
	return 0;
	
}


```

### 百分制分数转换为等级

``` c++

#include <stdio.h>

int main()
{
	int scr;
	scanf("%d", &scr);
	
	int tag = scr;
	scr /= 10;
	
	switch ( scr ) {
		case 10:
		case 9:
			printf("score=%d,grade:A", tag);
			break;
			
		case 8:
			printf("score=%d,grade:B", tag);
			break;
			
		case 7:
			printf("score=%d,grade:C", tag);
			break;
			
		case 6:
			printf("score=%d,grade:D", tag);
			break;
			
	    default:
			printf("score=%d,grade:E", tag);
			break;
	}
	
	return 0;
}

```

## 第五章1

### 求若干整数的最大值

``` c++

#include <stdio.h>

int main()
{
	int n;
	scanf("%d", &n);
	
	int max = 0;
	int cnt = 1;
	int num = 0;
	
	scanf("%d", &max);
	
	for (cnt = 1; cnt < n; cnt++) {
		scanf("%d", &num);
		if (num > max) {
			max = num;
		}
	}
	
    printf("%d", max);
	
	return 0;
}

```

### n！

``` c++

#include <stdio.h>

int main()
{
	int num = 0;
	int res = 1;
	int fac = 1;
	
	scanf("%d", &num);
	
	while (fac <= num){
		res *= fac;
		fac++;
	}
	
	printf ("%d!=%d", num, res);
	
	return 0;
} 


```

### 最大公约数

``` c++

#include <stdio.h>

int main()
{
	int num1, num2;
	scanf("%d %d", &num1, &num2);
	
	int mask = 0;
	
	while (num2 != 0) {
		mask = num1 % num2;
		num1 = num2;
		num2 = mask;
	}
	
	printf("%d", num1);
	
	return 0;
}//解决了1 2的公约数是1的问题


```

### 最小值和最大值

``` c++

#include <stdio.h>

int main ()
{
	int n = 0;
	scanf("%d", &n);
	
	int first = 0;
	scanf("%d", &first);
	
	int max = first;
	int min = first;
	int num = 0;
	int cntmax = 1;
	int cntmin = 1;
	
	for (int cnt = 1; cnt < n; cnt++) {
		scanf("%d", &num);
		if (num > max) {
			max = num;
			cntmax = 1;
		}else if (num == max) {
			cntmax++;
		}
		if (num < min) {
			min = num;
			cntmin = 1;
		}else if (num == min) {
			cntmin++;
		}
	}
	
	printf("%d %d\n%d %d", min, cntmin, max, cntmax);
	
	return 0;
}

```

### 连续因子

``` c++

#include <stdio.h>

int main() {
    long long n;
    scanf("%lld", &n);

    long long len = 0;
    long long ans = 0;

    for (long long i = 2; i * i <= n; i++) {
        long long temp = 1;
        long long k = i;
        while (temp * k <= n) {
            temp *= k;
            if (n % temp == 0 && k - i + 1 > len) {
                len = k - i + 1;
                ans = i;
            }
            k++;
        }
    }

    if (len == 0) {
        printf("1\n%lld\n", n);
    } else {
        printf("%lld\n", len);
        for (int i = 0; i < len; i++) {
            if (i > 0) printf("*");
            printf("%lld", ans + i);
        }
        printf("\n");
    }

    return 0;
}


```

### 打印沙漏

``` c++

#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int sum = -1;
	int i = 2;
	
	while (n - sum - i >= 0) {
		sum += i;
		i += 4;
	}
	
	int k = i;
	int j = 1;
	int u = 1;
	
	while (k > 2) {
		
	int t = k / 2;
	int j = u;
	
		while (t > 2) {
			if (t == 3) {
				printf("*\n");
			}else {
				printf("*");
			}
			t--;
		}
		
		while (j > 0 && k > 6) {
			printf(" ");
			j--;
		}
		
	k -= 4;
	u += 1;

	}
	
	k = i;
	u -= 3;
	int p = 3;
	int m = 3;
	
	while (u >= 0) {
		
		j = u;
	 	p = m;
	 	
		while (j > 0) {
			printf(" ");
			j--;
		}
		
		while (p > 0) {
			if (p == 1) {
				printf("*\n");
			}else {
				printf("*");
			}
			p--;
		}
		
		m += 2;
		u -= 1;
	}

	int difference = n - sum;
	
	printf("%d", difference);
	
	return 0;
}

```

### 念数字

``` c++
#include <stdio.h>

int main()
{
    int x;
    scanf("%d", &x);
    
    int mask = 1;
    int t = x;
    
    if (x < 0) {
    	printf("fu ");
    	x = - x;
    	t = - t;
	}
    
	while (t > 9) {
    	t /= 10;
    	mask *= 10;
	}
	
	do {
		int d = x / mask;
		
		switch (d) {
			case 0:
				printf("ling");
				break;
			case 1:
				printf("yi");
				break;
			case 2:
				printf("er");
				break;
			case 3:
				printf("san");
				break;
			case 4:
				printf("si");
				break;
			case 5:
				printf("wu");
				break;
			case 6:
				printf("liu");
				break;
			case 7:
				printf("qi");
				break;
			case 8:
				printf("ba");
				break;
			case 9:
				printf("jiu");
				break;								
		}
		
		x %= mask;
		mask /= 10;
		
		if (mask > 0) {
			printf(" ");
		}
		
	}while (mask > 0);

	return 0;	
}

```

### N个有理数求和

``` c++
#include <stdio.h>
#include <stdlib.h>

#define ll long long

ll abss(ll x) { return x < 0 ? -x : x; }

ll gcd(ll a, ll b) {
    if (a < 0) a = -a;
    if (b < 0) b = -b;
    while (b != 0) {
        ll t = a % b;
        a = b;
        b = t;
    }
    return a;
}

int main() {
    int n;
    if (scanf("%d", &n) != 1) return 0;

    ll num = 0;
    ll den = 1;

    for (int i = 0; i < n; ++i) {
        ll a, b;
        scanf("%lld/%lld", &a, &b);

        ll g = gcd(den, b);
        ll den1 = den / g;
        ll b1 = b / g;

        ll new_num = num * b1 + a * den1;
        ll new_den = den * b1;

        ll g2 = gcd(abss(new_num), new_den);
        new_num /= g2;
        new_den /= g2;

        if (new_den < 0) { new_den = -new_den; new_num = -new_num; }

        num = new_num;
        den = new_den;
    }

    ll integer = num / den;
    ll remainder = num % den;

    if (remainder == 0) {
        printf("%lld", integer);
        putchar('\n');
    } else {
        if (integer != 0) {
            printf("%lld", integer);
            putchar(' ');
            printf("%lld", remainder);
            putchar('/');
            printf("%lld", den);
            putchar('\n');
        } else {
            printf("%lld", remainder);
            putchar('/');
            printf("%lld", den);
            putchar('\n');
        }
    }

    return 0;
}

```

### 画方块

``` c++
#include <stdio.h>
#include <math.h>

int main()
{
	double n;
	char c;
	scanf("%lf %c", &n, &c);
	
	int cnt = 0;
	double mask = 0.0;
	int tag = round (n / 2);
	
	while (cnt <= n) {
		cnt++;
		printf("%c", c);
		if (cnt == n) {
			printf("\n");
			cnt = 0;
			mask ++;
			if (mask == tag) {
				break;
			}
		} 
	}
	
	return 0;
}

```

### 守形数

``` c++
#include <stdio.h>

int main()
{
	int min, max;
	scanf("%d %d", &min, &max);
	
	int tag = min;
	int mask = 10;
	int test = 0;
	int isfirst = 1;
	
	for (tag = min; tag <= max; tag++) {
		int t = tag * tag;
		int p = tag;
	    mask = 1;
		while (p > 0) {
			p /= 10;
			mask *= 10;
		}
		int cur = t % mask;
		if (cur == tag) {
			if (isfirst == 1) {
				printf("%d", tag);
				test = 1;
				isfirst = 0;
			}else{
			printf(" %d", tag);
		}
	}
	}
	
	if (test == 0) {
		printf("No exist");
	}

	return 0;
}


```

### 含数字5且是3的倍数

``` c++
#include <stdio.h>

int main ()
{
	int m, n;
	scanf("%d %d", &m, &n);
	
	int i = m;
	int tag = 1;
	
	while (i <= n) {
		
		int j = 1;
		int k = i;
		
		int mask = 0;
		
		while (k > 0) {
			int num = k % 10;
			if (num == 5) {
				mask = 1;
				break;
			}else {
				k /= 10;
			}
		}
		
		if (i % 3 == 0 && mask == 1) {
			if (tag == 1) {
				printf("%d", i);
				tag = 0;
			}else {
				printf(" %d", i);
			}
		}
		
		i++;
		
	}
	
	if (tag == 1) {
		printf("No exist");
	}
	
	return 0;
	
}

```

### 小球自由落体

``` c++
#include <stdio.h>

int main()
{
	int n;
	scanf("%d", &n);
	
	int cnt = 0;
	double res = 0.0;
	double h = 100.0;
	int tag = 1;
	
	for (cnt = 0; cnt< n; cnt++) {
		if (tag == 1) {
			res += 100;
			tag = 0;
		}else {
			h /= 2;
		    res += h*2;
		    
		}
	}
		  
	printf("%lf %lf", res, h/2);

    return 0;

}


```

### 鸡兔同笼

``` c++
#include <stdio.h>

int main()
{
	int h, f;
	scanf("%d %d", &h, &f);
	
	int c = 0;
	int r = 0;
	int res = 0;
	
    for (r = 0; r<= h; r++) {
    	c = h - r;
    	if (4*r + 2* c == f) {
    		res = 1;
    		break;
		}
	}
    
	if (res == 1) {
		printf ("%d %d", c, r);
	}else {
		printf("Error");
	}
	
	return 0;
	
}

```

### 计算π的近似值

``` c++
#include <stdio.h>

int main()
{
	int n;
	scanf("%d", &n);
	
	int cnt = 0;
	double res = 0.0;
	int i = 1;
	int sign = 1;
	
	for (cnt = 0; cnt < 2*n; cnt++) {
		res += sign * 1.0 / i;
		i += 2;
		sign = -sign;
	}
	
	printf("%lf", res*4.0);
	
	return 0;
}


```

### “韩信点兵”数

``` c++
#include <stdio.h>

int main()
{
	int min, max;
	scanf("%d %d", &min, &max);
	
	int res = 0;
	int cnt = 0;
	int tag = 1;
	
	for (res = min; res <= max ; res++) {
		if (res % 3 == 2 && res % 5 == 3 && res % 7 == 4) {
                if ( tag == 1) {
                    printf("%d", res);
                    tag = 0;
                    cnt++;
                }else {
                cnt++;
                printf(" %d", res);
			}
		}
		
	}
	
	if (cnt == 0) {
		printf("total=0");
	}else {
		printf("\ntotal=%d", cnt);
    }
	
	return 0;
}


```

### 祖孙年龄

``` c++
#include <stdio.h>

int main()
{
	int x, y1, y2, y3;
	scanf("%d %d %d %d", &x, &y1, &y2, &y3);
	
	int res = x - y1 - y2 - y3;
	
	if (res % 2 == 0) {
		printf("%d", res / 2 );
	}else {
		printf("%d", (res + 1) / 2 );
	}
	
	return 0;
}

```

### 输出Fibonacci数列的前n项

``` c++
#include <stdio.h>

int main()
{
	int n;
	scanf("%d", &n);
	
	int i = 1;
	int j = 0;
	int k;
	int cnt;
	int p = 1;
	
	for (cnt = 0; cnt < n; cnt++) { 
		printf("%10d", i);
		if (p % 5 == 0 && p!= 0) {
			printf("\n");
		}
		k = i;
		i = j + i;
		j = k;
		p++;
	}
	
	return 0;
} 

```

### 菱形图案

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	n += 1;
	
	int cnt = 1;
	int CNT = 1;
	
	for (int s = n - 1; s > 0; s--) {
		for (int cnt_s = s; cnt_s > 1; cnt_s--) {
			printf(" ");
		}
		
		int cnt_q = 1;
		
		for ( ; cnt_q <= cnt; cnt_q++) {
			if (cnt_q == cnt) {
				printf("*\n");
			}else {
				printf("*");
			}
		}
	
		cnt += 2;
	}
	
	int CNT_S = 1;
	int mask = 0;
	int tag = 1;
	
	for (int S = n - 2; S > 0; S--) {		
		int cnt_S = 1;
		for (int cnt_S = 1 ; cnt_S <= CNT_S; cnt_S++) {
			mask++;
			if (cnt_S == 1 && tag == 0) {
				printf("\n ");
			}else {
				printf(" ");
			}	
		}

		int cnt_Q = 2 * (n - 1) - 3;
		
		for ( ; cnt_Q > 0; cnt_Q--) {
			if (cnt_Q == 1) {
				printf("*");
			}else {
				printf("*");
			}
		} 
		
		CNT += 1;
		n--;
		CNT_S++;
		tag = 0;
	}
	
	return 0;
}


```

### 计算某分数序列的前n项之和

``` c++
#include <stdio.h>

int main()
{
	int n;
	scanf("%d", &n);
	
	double sum = 0.0;
    int cnt = 0;
	double i = 2.0;
	double j = 1.0;
	double k = 2.0;
	
	for (cnt = 0; cnt < n; cnt++) {
		sum += i / j;
		k = i;
		i += j;
		j = k; 
	}
	
	printf("%lf", sum);
	
	return 0;
}

```

### 素数

``` c++
#include <stdio.h>

int main()
{
	int num;
	int i;
	int isprime = 1;
	
	scanf("%d", &num);
	
	if (num == 1) {
		printf("NO");
		goto final;
	}else { 
	
	for (i = 2; i < num; i++){
		if (num % i == 0){
			isprime = 0;
			break;
		}
		
	}
	if (isprime == 1) {
		printf("YES");
	}else {
	    printf("NO"); 
	}
}
final:
	
	return 0;
}


```

## 第五章2

### 寻找250

``` c++
#include <stdio.h>

int main ()
{	
    int result = 1;
    int cnt = 0;

	do {
		int num = 0;
		result = scanf("%d", &num);
		cnt++;
		if (num == 250) {
			break;
		}
	}while (result == 1);
	
	printf("%d", cnt);
	
	return 0;
	
}

```

### 计算阶乘和  

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int cnt = 1;
	int s = 0;
	
	do {
		int count = 1;
		int cur = 1;
		while (count <= cnt) {
			cur = count * cur;
			count++; 
			} 
		s += cur;
		cnt++;
	} while (cnt <= n);
	
	printf("%d", s);
	
	return 0;
} 


```

### 整除光棍

``` c++
#include<stdio.h>

int main()
{	    
	int x;
	scanf("%d", &x);		
	int count = 1;   
	int a = 1;	    

	while (a < x) {			
		a = a * 10 + 1;		
		count++;
	}
	printf("%d", a / x);
		
	int t = a % x;  
	
	while (t != 0) {			//利用循环将商从高到低位依次输出，直到余数为0。
		t = t * 10 + 1;		
		printf("%d", t / x);
		count++;
		t %= x;
	}
	printf(" %d", count);

	return 0;
}

```

### 求幂级数展开的部分和

``` c++
#include <stdio.h>

int main ()
{
	double x;
	scanf("%lf", &x);
	
	double res = 1;
	int t = x;
	double temp = 1;
	int cnt = 1;
	
	while (temp >= 0.000001) {
		temp = temp * x / cnt;
		res += temp;
		cnt++;
	}
	
	printf("%.5f", res);
	
	return 0;
}


```

### 求奇数和

``` c++
#include <stdio.h>

int main ()
{
	int num = 1;
	int temp = 0;
	int res = 0;
	
	while (num > 0) {
		scanf("%d", &num);
		if (num > 0) {
			temp = num % 2;
			if (temp != 0) {
				res += num;
		    }	
		}
		
	}
	
	printf("%d", res);
	
	return 0;
}

```

### 猴子吃桃问题

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int res = 1;
	
	for (int cnt = 1; cnt < n; cnt++) {
		res = (res + 1) * 2;
	}
	
	printf("%d", res);
	
	return 0;
}


```

### 水仙花数
``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int first = 1;
	int i = 1;
	
	while (i < n) {
		first *= 10;
		i++;
	}
	
    i = first;
    
    while (i < first * 10) {
    	int t = i;
    	int sum = 0;
    	
    	do {
    		int d = t % 10;
    		t /= 10;
    		int p = d;
    		int j = 1;
    		
    		while (j < n) {
    			p *= d;
    			j++;
			}
			sum += p;
			
		} while (t > 0);
		
		if (sum == i) {
			printf("%d\n", i);
		}
    	
    	i++;
	}
	
	return 0;
}

```

### 兔子繁衍问题

``` c++
#include <stdio.h>

int main() {
    int N;
    scanf("%d", &N);

    if (N <= 1) {
        printf("1\n");
        return 0;
    }

    int a = 1;
    int b = 1;
    int month = 2;

    while (b < N) {
        int c = a + b;
        a = b;
        b = c;
        month++;
    }

    printf("%d\n", month);
    return 0;
}

```

### 黑洞数

``` c++
#include <stdio.h>

int main ()
{
	int num = 0;
	scanf("%d", &num);
	
	int x = num;
	int temp = 0;
	int X = 0;
	int cnt = 1;
	
	do {
		int c = 0;
		int b = 0;
		int a = 0;
		
		c = x / 100;
		b = x / 10 - c * 10;
		a = x - c * 100 - b * 10;
		
		if (a > b) {
			if (b > c) {
				temp = a * 100 + b * 10 + c;
				x = c * 100 + b * 10 + a;
			}else if (a > c) { 
				temp = a * 100 + c * 10 + b;
				x = b * 100 + c * 10 + a;
			}else {
				temp = c * 100 + a * 10 + b;
				x = b * 100 + a * 10 + c;
			}
		}else if (a > c) {
			temp = b * 100 + a * 10 + c;
			x = c * 100 + a * 10 + b;
		}else if (b > c) {
			temp = b * 100 + c * 10 + a;
			x = a * 100 + c * 10 + b;
		}else {
			temp = c * 100 + b * 10 + a;
			x = a * 100 + b * 10 + c;
		}
	  
	    int mask = temp - x;
	    if (mask == 495) {
	    	printf("%d: %d - %d = %d", cnt, temp, x, mask);
		}else {
	        printf("%d: %d - %d = %d\n", cnt, temp, x, mask);
 		}
		X = x;
		x = mask;
		cnt++;
		
	}while (temp - X != 495);
	
	return 0;
}

```

### 输出三角形字符阵列

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	char chr = 'A';
	int cnt = 0;
	int N = n;
	int mask = 1;
	
	while (cnt <= n) {
		
		if (N == 1 && mask == 1) {
			printf("%c\n", chr);	
		}else if (N > 1 && mask == 1) {
			printf("%c ", chr);	
		}else if (N == 1 && mask == 0) {
			printf("%c", chr);
		}
		
		chr++;
		N--;
		
		if (N == 0) {
			n -= 1;
			N = n;
			cnt = 0;
		} 
		
		if (N == 1 && n == 1) {
			mask = 0;
		} 
		
		cnt++;
		
	}
	
	return 0;
	
}

```
### 求整数的位数及各位数字之和

``` c++
#include <stdio.h>

int main() {
    long long N;
    scanf("%lld", &N);

    int digits = 0;
    int sum = 0; 
    long long temp = N;

    while (temp > 0) {
        sum += temp % 10; 
        temp /= 10; 
        digits++;
    }

    printf("%d %d\n", digits, sum);
    return 0;
}


```

### 特殊a串数列求和

``` c++
#include <stdio.h>

int main ()
{
	int a, n;
	scanf("%d %d", &a, &n);
	
	int temp = a;
	int res = a;
	
	for (int cnt = 0; cnt < n - 1; cnt++) {
		temp = temp * 10 + a;
		res += temp;
		
	}
	
	printf("%d", res);
	
	return 0;
}

```

### 验证“哥德巴赫猜想”

``` c++
#include <stdio.h>

int main ()
{
	long int n;
	scanf("%ld", &n);
	
	long int b = 0;
	long int num1 = 0;
	long int num2 = 0;
	
	for (long int t = 2; t <= n; t++) {
		int isPrime = 1;
		
		for (long int i = 2; i * i < t; i++) {
			if (t % i == 0 && t != 2) {
				isPrime = 0;
				break;
			}
		}
		
		if (isPrime == 1) {
			num1 = t;
			b = n - t;
		}
		
		int isprime = 1;
		
		for (long int j = 2; j * j < b; j++) {
			if (b % j == 0 && b != 2) {
				isprime = 0;
				break;
			}
		}
		
		if (isprime == 1) {
			num2 = b;
			break;
		}
	}
	
	printf("%ld = %ld + %ld", n, num1, num2);
	
	return 0;
	
}

```

### 换硬币

``` c++
#include <stdio.h>

int main ()
{
	int x;
	scanf("%d", &x);
	
	int one;
	int two;
	int five;
	int mask = 0;
	
	for (five = x / 5; five != 0; five--) {
		for (two = x / 2; two != 0; two--) {
			for (one = x - 1; one != 0; one--) {
				if (one + two * 2 + five * 5 == x) {
					int cnt = one + two + five;
					printf("fen5:%d, fen2:%d, fen1:%d, total:%d\n", five, two, one, cnt);
					mask++;
				}
			}
		}
	}
	
	printf("count = %d", mask);
	
	return 0;
}

```

### 统计素数并求和

``` c++
#include <stdio.h>

int main () 
{
	int m, n;
	scanf("%d %d", &m, &n);
	
	int cnt = 0;
	int res = 0;
	
	if (m < 2) {
		m = 2;
	}
	
	for (int t = m; t <= n; t++) {
		int isPrime = 1;
		for (int x = 2; x < t; x++) {
			int rem = t % x;
			if (rem == 0) {
				isPrime = 0;
				break;
			}
		}
		if (isPrime == 1) {
			res += t;
			cnt++;
		}
	}
	
	printf("%d %d", cnt, res);
	
	return 0;
}

```

### 求e的近似值

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	double e = 1;
	double res = 1;
	
	for (int num = 1; num <= n; num++) {
		res = 1;
		for (int t = 1; t <= num; t++) {
			res *= t;
		}
		e += 1.0 / res;
	}
	
	printf("%.8f", e);
	
	return 0;
}

```

### 求平方与倒数序列的部分和

``` c++
#include <stdio.h>

int main ()
{
	double m, n;
	scanf("%lf %lf", &m, &n);
	
	double s = 0;
	
	for ( ; m <= n; m++) {
		s += m * m + 1.0 / m;
	}
	
	printf("%.6f", s);
	
	return 0;
}

```

### 求组合数

``` c++
#include <stdio.h>

int main()
{
	int n, m;
	scanf("%d %d", &n, &m);
	
	double N = 1;
	
	for (int numN = 1; numN <= n; numN++) {
		N *= numN;
	}
	
	double M = 1;
	
	for (int numM = 1; numM <= m; numM++) {
		M *= numM;
	}
	
	double C = 1;
	
	for (int numC = 1; numC <= m - n; numC++) {
		C *= numC;
	}
	
	double res = M / N / C;
	
	printf("%.0f", res);
	
	return 0;
}

```

### 求简单交错序列前N项和

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
	int den = 1;
	double s = 0;
	int sign = 1; 
	
	for (int cnt = 0; cnt < n; cnt++) {
		s += sign * 1.0 / den;
		den += 3;
		sign = -sign;
	}
	
	printf("%.4f", s);
	
	return 0;
}

```

### 最佳情侣身高差

``` c++
#include <stdio.h>

int main ()
{
	int n;
	scanf("%d", &n);
	
    char x;
	double h;
	int cnt = 0;
	
	do {
	    scanf(" %c", &x);
		scanf("%lf", &h);
		if (x == 'M') {
			h /= 1.09;
		}else {
			h *= 1.09;
		}
		
		printf("%.2f\n", h);
		cnt++;
    } while (cnt < n);	
    
    return 0;
}

```
