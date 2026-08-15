/*input a no and print the following 1*2*3*4*5*6......*n */
#include<stdio.h>
#include<conio.h>
void main()
{
int n,i,f=1;
clrscr();
printf("enter the no");
scanf("%d",&n);
for(i=1;i<=n;i++)
f=f*i;
printf("The multiplication from 1 to %d =%d",n,f);
getch();
}
