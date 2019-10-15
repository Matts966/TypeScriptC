#include <tk/tkernel.h>
#include <tm/tmonitor.h>
#include <libstr.h>

EXPORT INT usermain( void ) {
    while ( 1 ) {
        tm_putstring("output!\n");
    }
}
