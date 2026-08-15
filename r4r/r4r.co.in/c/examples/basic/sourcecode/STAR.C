#include<stdio.h>
#include<conio.h>
void main()
{
int i,j,k=10,l;
clrscr();
for(i=0;i<10;i++)
{
for(l=k;l>0;l--)
printf(" ");
for(j=0;j<=i;j++)
printf("* ");
printf("\n");
k--;
}
getch();
}