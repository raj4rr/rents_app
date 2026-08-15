/*Enter the number::123445

 One Lac Twenty Three Thousand Four Hundred Fourty Five
*/

#include<stdio.h>
#include<conio.h>
void main()
{
int i,d=0;
long n,num;
long a[10];
clrscr();
printf("Enter the number::");
scanf("%ld\n",&n);
num=n;
while(num!=0)
{
num=num/10;
d++;
}
for(i=0;n>0;i++)
{
a[i]=n%10;
n=n/10;
}


for(d=d-1;d>=0;d--)
{
if(d==0)
{
switch(a[d])
{
	case 1:
	printf(" One");
	break;
	case 2:
	printf(" Two");
	break;
	case 3:
	printf(" Three");
	break;
	case 4:
	printf(" Four");
	break;
	case 5:
	printf(" Five");
	break;
	case 6:
	printf(" Six");
	break;
	case 7:
	printf(" Seven");
	break;
	case 8:
	printf(" Eight");
	break;
	case 9:
	printf(" Nine");
	break;
}    //switch
break;
}//if
else if((d==1||d==4||d==6||d==8)&&a[d]==1)
{
    switch(a[--d])
  {
	case 0:
	printf(" Ten");
	break;
	case 1:
	printf(" Eleven");
	break;
	case 2:
	printf(" Twelve");
	break;
	case 3:
	printf(" Thirteen");
	break;
	case 4:
	printf(" Fourteen");
	break;
	case 5:
	printf(" Fifteen");
	break;
	case 6:
	printf(" Sixteen");
	break;
	case 7:
	printf(" Seventeen");
	break;
	case 8:
	printf(" Eighteen");
	break;
	case 9:
	printf(" Nineteen");
	break;
}//switch
if(d==3)
printf(" Thousand");
if(d==5)
printf(" Lac");
if(d==7)
printf(" Crore");
}//else if
else if(a[d]==0);
else if(d==1||d==4||d==6||d==8)
{
    switch(a[d])
  {
	case 2:
	printf(" Twenty");
	break;
	case 3:
	printf(" Thirty");
	break;
	case 4:
	printf(" Fourty");
	break;
	case 5:
	printf(" Fifty");
	break;
	case 6:
	printf(" Sixty");
	break;
	case 7:
	printf(" Seventy");
	break;
	case 8:
	printf(" Eighty");
	break;
	case 9:
	printf(" Ninety");
	break;
}//switch
}//else if
else
{
  switch(a[d])
{
	case 1:
	printf(" One");
	break;
	case 2:
	printf(" Two");
	break;
	case 3:
	printf(" Three");
	break;
	case 4:
	printf(" Four");
	break;
	case 5:
	printf(" Five");
	break;
	case 6:
	printf(" Six");
	break;
	case 7:
	printf(" Seven");
	break;
	case 8:
	printf(" Eight");
	break;
	case 9:
	printf(" Nine");
	break;
}    //switch
if(d==7)
printf(" Crore");
if(d==5)
printf(" Lac");
if(d==3)
printf(" Thousand");
if(d==2)
printf(" Hundred");
}//else
}//for
getch();
}//main
