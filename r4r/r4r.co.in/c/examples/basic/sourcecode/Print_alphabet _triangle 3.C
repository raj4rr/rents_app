
#include<stdio.h>
#include<conio.h>           /*  A             */
void main()                 /*  B C           */
{                           /*  D E F         */
int i,j,k=65;               /*  G H I J       */
clrscr();		    /*  K L M N 0     */
for(i=65;i<=70;i++)
{
for(j=65;j<=i;j++)
printf("%c",k++);
printf("\n");
}
getch();
}