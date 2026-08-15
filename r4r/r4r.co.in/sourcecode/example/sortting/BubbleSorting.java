class BubbleSorting{
public static void main(String arg[]){
	int a[]={2,33,54,12,0,46,34,22,4,4,4,4};
	System.out.println("\n\nInput values:");
	for(int i=0;i<a.length;i++){
		System.out.print(" "+a[i]);
		}
	for (int i = a.length; --i>=0; ){
		for (int j = 0; j<i; j++){
		if (a[j] > a[j+1])
			{
			int T = a[j];
			a[j] = a[j+1];
			a[j+1] = T;
		  }
		 }   
        }
	System.out.println("\n\n\nSorted values:");
	for(int i=0;i<a.length;i++)
		{
	System.out.print(" "+a[i]);
	    }
}
}
