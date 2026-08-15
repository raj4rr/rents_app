
			       /* print the        */
#include<stdio.h>              /*  1               */
#include<conio.h>              /*  1 2             */
void main()                    /*  1 2 3           */
{                              /*  1 2 3 4         */
int i,j,n;                     /*  1 2 3 4 5       */
clrscr();
printf("Enter the number\t");
scanf("%d",&n);
for(i=1;i<=n;i++)
{
for(j=1;j<=i;j++)
printf("%d",j);
printf("\n");
}
getch();
}

