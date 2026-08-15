/* print average of n number. */
#include<stdio.h>
#include<conio.h>
void main()
{
int i,sum=0,n;
float avg;
clrscr();
printf("Enter a to which you have to calculate the arg:\t");
scanf("%d",&n);
for(i=1;i<=n;i++)
sum=sum+i;
avg=(float)sum/n;
printf("The average:\t%f",avg);
getch();
}