#include <tk/tkernel.h>
#include <tm/tmonitor.h>
#include <libstr.h>

EXPORT INT usermain( void ) {
    int i;
    for ( i = 0; i < 3; i++ ) {
		tm_putstring("output!");
	}
}
