/* swap two number using two variables */
#include<stdio.h>
#include<conio.h>
void main()
{
int a,b;
clrscr();
printf("Enter the two numbers\t");
scanf("%d%d",&a,&b);
a=a+b;
b=a-b;
a=a-b;
printf("\n Swapped numbers a=%d b=%d",a,b);
getch();
}

