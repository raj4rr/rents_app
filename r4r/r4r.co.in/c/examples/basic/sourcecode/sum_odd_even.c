 /* print the sum of odd number and even number separately of n number */
#include<stdio.h>
#include<conio.h>
void main()
{
int a,i,even=0,odd=0;
clrscr();
printf("Enter a number\t");
scanf("%d",&a);
for(i=1;i<=a;i++)
{
if(i%2==0)
even=even+i;
else
odd=odd+i;
}
printf("\nsum of the even\t=%d",even);
printf("\nsum of the odd\t=%d",odd);
getch();
}

