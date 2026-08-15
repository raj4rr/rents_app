#include<stdio.h>
#include<conio.h>             /*            * * * * *     */
void main()                   /*             * * * *      */
{                             /*              * * *       */
int i,j,k,n;                  /*               * *        */
clrscr();                     /*                *         */
printf("Enter a number\t");
scanf("%d",&n);
for(i=1;i<=n;i++)
{
for(j=n;j>=i;j--)
printf("* ");
printf("\n");
for(k=1;k<=i;k++)
printf(" ");
}
getch();
}

