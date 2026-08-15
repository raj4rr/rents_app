/* 1
   0 1
   1 0 1
   0 1 0 1
   1 0 1 0 1 */
   #include<stdio.h>
   #include<conio.h>
   void main()
   {
   int i,j,n;
   clrscr();
   printf("Enter a number\t");
   scanf("%d",&n);
   for(i=1;i<=n;i++)
   {
   for(j=1;j<=i;j++)
   {
   if(i%2==0)
    {
    if(j%2==0)
    printf("1");
    else
    printf("0");
     }
    else
    {
    if(j%2==0)
    printf("0");
    else
    printf("1");
    }
    }
    printf("\n");
    }
    getch();
    }
