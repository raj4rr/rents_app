/* accept a number and check it  is prime number or not a prime number*/

#include<stdio.h>
#include<conio.h>
void main()
{
int t,c=0,i;
clrscr();
printf("Enter a number\t");
scanf("%d",&t);
for(i=1;i<=t;i++)
{
if(t%i==0)
c++;
}
if(c==2)
printf("\nNumber is prime");
else
printf("\nNumber is not prime");
getch();
}