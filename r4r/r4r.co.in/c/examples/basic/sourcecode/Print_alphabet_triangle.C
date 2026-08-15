/* A
   B B
   C C C
   D D D D
   E E E E E */
   #include<stdio.h>
   #include<conio.h>
   void main()
   {
   int i,j;
   int n;
   clrscr();
   printf("Enter the ASCII character\t");
   scanf("%d",&n);
   for(i=65;i<=n;i++)
   {
   for(j=65;j<=i;j++)
   printf("%c",i);
   printf("\n");
   }
   getch();
   }
