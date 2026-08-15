/*   * * * *
     * * * *
     * * * *
     * * * *  print it  */
     #include<stdio.h>
     #include<conio.h>
     void main()
     {
     int i,j,row,col;
     clrscr();
     printf("Enter the row and column\t");
     scanf("%d%d",&row,&col);
     for(i=1;i<=row;i++)
     {
     for(j=1;j<=col;j++)
     printf("*");
     printf("\n");
     }
     getch();
     }
