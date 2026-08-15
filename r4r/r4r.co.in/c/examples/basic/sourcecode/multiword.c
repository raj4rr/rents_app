/*Print the multiword string */
#include<stdio.h>
#include<conio.h>
void main()
{
char c[10];
clrscr();
printf("Here you can enter string with space.\n");
printf("Enter the string:\t");
gets(c);
puts("Your string is:\t");
puts(c);
getch();
}