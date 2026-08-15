/*
        How many row do you want to print of Pascal Triangle:6
      1

     1 1

    1 2 1

   1 3 3 1

  1 4 6 4 1

 1 5 10 10 5 1

*/


#include<stdio.h>
#include<conio.h>
void main()
{
int i,j,k,l,m,row;
int a[15];
clrscr();
for(i=0;i<15;i++)
a[i]=1;
printf("\n\tHow many row do you want to print of Pascal Triangle:");
scanf("%d",&row);
l=row;
for(i=0;i<row;i++)
  {
  for(j=l;j>0;j--)
    printf(" ");
    l--;
    for(k=0;k<=i;k++)
    printf("%d ",a[k]);
    printf("\n\n");
    for(m=i;m>0;m--)
    a[m]=a[m]+a[m-1];
  }
  getch();
}