/*
        Enter The limit upto which you want to print
        Armstrong number.1234

        153
        370
        371
        407*/

#include<stdio.h>
#include<conio.h>
void main()
{
long n,i,j,num;
clrscr();
printf("\n\tEnter The limit upto which you want to print\n\tArmstrong number.");
scanf("%ld",&n);
for(i=2;i<=n;i++)
  {
   num=i;
   j=0;
   while(num!=0)
   {
   j=j+((num%10)*(num%10)*(num%10));
   num=num/10;
   }
   if(j==i)
   printf("\n\t%ld",i);
  }
getch();
}