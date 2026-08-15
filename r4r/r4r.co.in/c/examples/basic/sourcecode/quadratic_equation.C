/* find out the root of the quadratic equation ax^2+bx^2+c=0 */
/* here thr expression b^2-4ac is called the discriminate  */
#include<stdio.h>
#include<conio.h>
#include<math.h>
#include<process.h>
void main()
{
float a,b,c,des,root1,root2;
clrscr();
printf("\nEnter the 3 number");
scanf("%f%f%f",&a,&b,&c);
if(a==0)
{
printf("\nequation is not a quadratic");
exit(0);
}
des=(float)(b*b-4*a*c)/(2*a);
if(des>=0)
{
root1=(float)(-b+sqrt(des))/(2*a);
root2=(float)(-b-sqrt(des))/(2*a);
printf("\nboth real root of equ root1=%f and root2=%f",root1,root2);
}
else
printf("it is a complex root");
getch();
}


