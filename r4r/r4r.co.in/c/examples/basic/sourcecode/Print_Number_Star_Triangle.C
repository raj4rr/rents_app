
/*
1
2 3
4 5 6
7 8 9 10
*/
#include<stdio.h>
#include<conio.h>
void main()
{
int i,j,k=1,n;
clrscr();
printf("Enter a number\t");
scanf("%d",&n);
for(i=1;i<=n;i++)
{
for(j=1;j<=i;j++)
printf("%d ",k++);
printf("\n");
}
getch();
}
