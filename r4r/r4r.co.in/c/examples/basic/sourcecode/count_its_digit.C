/* input a number and count its digit*/
#include<stdio.h>
#include<conio.h>
void main()
{
int i,p=0;
clrscr();
printf("Enter a number");
scanf("%d",&i);
while(i!=0)
{
i=i/10;
p++;
}
printf("Digit is =%d",p);
getch();
}