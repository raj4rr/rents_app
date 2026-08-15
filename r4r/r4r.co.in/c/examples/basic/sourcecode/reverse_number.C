/*print the reverse no*/
#include<stdio.h>
#include<conio.h>
void main()
{
int a,r=0,p;
clrscr();
printf("enter the number\t");
scanf("%d",&a);
while(a!=0)
{
p=a%10;
r=r*10+p;
a=a/10;
}
printf("Reversr number is=%d",r);
getch();
}