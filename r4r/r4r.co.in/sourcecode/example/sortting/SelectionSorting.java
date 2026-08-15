class SelectionSorting{
public static void main(String arg[]){
	int a[]={3,30,4,12,1,2,34,22,4,3,5,8};
	System.out.println("\n\nInput values:");
	for(int i=0;i<a.length;i++){
		System.out.print(" "+a[i]);
		}
	for (int i = 0; i < a.length; i++){
	    int min = i;
		int j;
		/*
        *  Find the smallest element in the unsorted list
        */
     for (j = i + 1; j < a.length; j++) {
     if (a[j] < a[min]){
		 min = j;
		 }
		 }
		 /*
		 *  Swap the smallest unsorted element into the end of the sorted list.
		 */
		 int T = a[min];
		 a[min] = a[i];
		 a[i] = T;   
        }
	System.out.println("\n\n\nSorted values:");
	for(int i=0;i<a.length;i++)
		{
	System.out.print(" "+a[i]);
	    }
}
}
