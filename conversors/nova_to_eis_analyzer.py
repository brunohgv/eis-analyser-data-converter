import sys
import os
import csv
from tabulate import tabulate
from io import StringIO

def convert(file):
    data = str(file.read())
    rows = data.split('\\r\\n')

    new_data = []
    for row in rows:
        new_data.append(row.split(';'))

    header = new_data[0]

    new_data = new_data[1 : len(new_data) - 1]

    frequency_index = header.index('Frequency (Hz)')
    real_z_index = header.index("Z' (\\xce\\xa9)")
    imaginary_z_index = header.index("-Z'' (\\xce\\xa9)")

    frequency_list = []
    real_z_list = []
    imaginary_z_list = []
    number_of_rows = 0

    for row in new_data:
        number_of_rows = number_of_rows + 1
        frequency_list.append(row[frequency_index])
        real_z_list.append(row[real_z_index])
        imaginary_z_list.append(row[imaginary_z_index])

    print('CURRENT DIR: ' + os.path.curdir)
    new_file_full_path = os.path.join(os.path.curdir, 'conversors', 'converted', 'converted.txt')

    f = open(new_file_full_path, "w")

    f.write(str(number_of_rows) + '\n')

    table = []

    for index, row in enumerate(real_z_list):
        table.append([real_z_list[index], imaginary_z_list[index], frequency_list[index]])

    f.write(tabulate(table, tablefmt='plain'))

    return f