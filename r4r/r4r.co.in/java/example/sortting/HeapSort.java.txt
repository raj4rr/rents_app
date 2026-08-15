class HeapSort{
public static void main(String arg[]){
	int a[]={3,30,4,12,1,2,34,22,4,3,5,8};
	System.out.println("\n\nInput values:");
	for(int i=0;i<a.length;i++){
		System.out.print(" "+a[i]);
		}
	int N = a.length;
	for (int k = N/2; k > 0; k--) {
	    downheap(a, k, N);
	    
        }
	do {
            int T = a[0];
            a[0] = a[N - 1];
            a[N - 1] = T;
	    N = N - 1;
	   
            downheap(a, 1, N);
	} while (N > 1);
    System.out.println("\n\n\nSorted values:");
	for(int i=0;i<a.length;i++)
		{
	System.out.print(" "+a[i]);
	    }
}
 static void downheap(int a[], int k, int N) {
	int T = a[k - 1];
	while (k <= N/2) {
            int j = k + k;
            if ((j < N) && (a[j - 1] < a[j])) {
	        j++;
	    }
	    if (T >= a[j - 1]) {
		break;
	    } else {
                a[k - 1] = a[j - 1];
                k = j;
            }
	}
        a[k - 1] = T;
	
    }
}
