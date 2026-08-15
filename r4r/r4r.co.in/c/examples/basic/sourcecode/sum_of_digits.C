/* input a number and sum its digits */
#include<stdio.h>
#include<conio.h>
void main()
{
int i,p,r=0;
clrscr();
printf("\nEnter a number to sum its digits :\t");
scanf("%d",&i);
while(i!=0)
{
p=i%10;
r=r+p;
i=i/10;
}
printf("The sum of digits\t:%d",r);
getch();
}
