/*


A B C D E F G F E D C B A
A B C D E F   F E D C B A
A B C D E       E D C B A
A B C D           D C B A
A B C               C B A
A B                   B A
A                       A
*/

#include<stdio.h>
#include<conio.h>
void main()
{
int i=1,space=0,j,k=71,rev;
clrscr();
printf("\n\n\n");
while(i<=7)
{
for(j=65;j<=k;j++)
printf("%c ",j);
rev=k;
while(space!=0)
{
printf("  ");
space--;
}
space=2*i-1;
if(i==1)
rev=k-1;
while(rev>=65)
{
printf("%c ",rev);
rev--;
}
i++;
k--;
printf("\n");
}
getch();
}
