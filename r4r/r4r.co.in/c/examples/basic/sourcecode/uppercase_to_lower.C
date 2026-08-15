/* input an alphabets and change its case */
#include<stdio.h>
#include<conio.h>
void main()
{
char ch;
clrscr();
printf("Enter an alphabet:\t");
scanf("%c",&ch);
if(ch>=65 && ch<=90)
{
ch=ch+32;
printf("You have enter a Caps Latter");
printf("/n The lower case is =%c",ch);
}
else if(ch>=97 && ch<=122)
{
ch=ch-32;
printf("Change in to uppercase=%c",ch);
}
else
printf("Have entered alphabet is not character.....:)");
getch();
}