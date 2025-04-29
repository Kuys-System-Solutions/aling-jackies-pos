import sqlite3
import os
import sys

def wipe_db():
    try:
        if '/server' not in os.getcwd():
            os.chdir('server')
        os.remove('pos.db')
    except Exception as e:
        print(f"An error occured: {e}")

def main():
    confirm = input("Are you sure you want to wipe the database? (yes/no)")
    wipe_db() if confirm == 'yes' else print("Operation cancelled.")
    print("DB wiped successfully.") if confirm == 'yes' else ''

if __name__ == "__main__":
    main()