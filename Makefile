all: compile link run

compile: 
	g++ -c *.cpp -I"C:\Users\LENOVO\Documents\libraries\SFML-2.5.1\include" -DSFML_STATIC

link:
	g++ *.o -o main -L"C:\Users\LENOVO\Documents\libraries\SFML-2.5.1\lib" -lsfml-graphics-s -lsfml-window-s -lsfml-system-s -lopengl32 -lfreetype -lwinmm -lgdi32
	
clean:
	del *.o *.exe

reset:
	del *.cpp *.o *.exe *.h

run:
	.\main