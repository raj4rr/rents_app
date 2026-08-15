/* check a number is perfect or not,( perfect number is sum of its factor number) */
#include<stdio.h>
#include<conio.h>
void main()
{
int i, p,sum=0;
clrscr();
printf("Enter a number :\t");
scanf("%d", &p);
for(i=1;i<=p;i++)
{
if(p%i==0)
sum=sum+i;
}
if(sum==p)
printf("Number is perfect");
else
printf("Number is not perfect");
getch();
}

