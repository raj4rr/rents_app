/* greatest number of any three given number */
#include<stdio.h>
#include<stdio.h>
void main()
{
int a,b,c;
clrscr();
printf("enter the three numbers\t");
scanf("%d%d%d",&a,&b,&c);
if(a>b && a>c)
printf("%d is greatest number",a);
else if(b>c && b>a)
printf("%d is greatest number",b);
else
printf("%d is greatest number",c);
getch();
}

