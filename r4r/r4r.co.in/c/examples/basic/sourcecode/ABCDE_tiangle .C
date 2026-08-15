
#include<stdio.h>
#include<conio.h>           /*  A             */
void main()                 /*  A B           */
{                           /*  A B C         */
int i,j;                    /*  A B C D       */
clrscr();                   /*  A B C D E     */
for(i=65;i<=69;i++)
{
for(j=65;j<=i;j++)
printf("%c",j);
printf("\n");
}
getch();
}