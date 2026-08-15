class InsertionSort{
public static void main(String arg[]){
	int a[]={3,30,4,12,1,2,34,22,4,3,5,8};
	System.out.println("\n\nInput values:");
	for(int i=0;i<a.length;i++){
		System.out.print(" "+a[i]);
		}
	for (int i = 1; i < a.length; i++) {
	    int j = i;
	    int B = a[i];
	    while ((j > 0) && (a[j-1] > B)) {
               
	        a[j] = a[j-1];
	        j--;
	     }
	    a[j] = B;           
        }
	System.out.println("\n\n\nSorted values:");
	for(int i=0;i<a.length;i++)
		{
	System.out.print(" "+a[i]);
	    }
}
}
