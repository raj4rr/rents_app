/* Input a character and check it vowel or not */
#include<stdio.h>
#include<stdio.h>
void main()
{
char ch;
clrscr();
printf("Enter an alphabet \t:");
scanf("%c",&ch);
if(ch=='a'||ch=='A'||ch=='e'||ch=='E'||ch=='i'||ch=='I'||ch=='o'||ch=='O'||ch=='u'||ch=='U')
printf("\n\nIt is a vowel");
else
printf("\n\nIt is a consonant");
getch();
}