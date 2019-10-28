#include <tk/tkernel.h>
#include <tm/tmonitor.h>
#include <libstr.h>

EXPORT void tsk_a(INT stacd, VP exinf);
typedef enum { TSK_A, OBJ_KIND_NUM } OBJ_KIND;
EXPORT ID ObjID[OBJ_KIND_NUM];

EXPORT void tsk_a(INT stacd, VP exinf) {
	int i;
	for ( i = 0; i < 3; i++ ) {
		tm_putstring("output!");
	}
	tk_ext_tsk();
}

EXPORT INT usermain( void ) {
	T_CTSK t_ctsk;
	ID objid;
	t_ctsk.tskatr = TA_HLNG | TA_DSNAME;
	t_ctsk.stksz = 1024;

	t_ctsk.task = tsk_a;
	while(1) {
		tk_sta_tsk( ObjID[TSK_A], 0 );
	}
}
