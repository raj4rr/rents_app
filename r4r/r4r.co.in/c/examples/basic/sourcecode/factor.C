/* Enter a number and show its factor */
#include<stdio.h>
#include<conio.h>
void main()
{
int a,i;
clrscr();
printf("Enter a number\t");
scanf("%d",&a);
for(i=1;i<=a;i++)
{
if(a%i==0)
printf("\nFactor of the number is\t=%d",i);
}
getch();
}


