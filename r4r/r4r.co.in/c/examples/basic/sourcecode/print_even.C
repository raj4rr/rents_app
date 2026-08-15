/*Print all even numbers from 1 to 100 */
#include<stdio.h>
#include<conio.h>
void main()
{
int i;
clrscr();
printf("Print  all even numbers from 1 to 100\n");
printf("Even Numbers are:\n");
for(i=1;i<=100;i++)
{
 if(i%2==0)
 printf("%d ",i);
}
getch();
}