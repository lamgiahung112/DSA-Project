#include <bits/stdc++.h>

using namespace std;

struct Node {
    string name;
    vector<Node*> neighbors;
};

map<string, map<string, int>> weightage; // weightage["A"]["B"]
map<string, Node*> nodes;

/**
 * @brief Đọc file và lưu vào các biến
 * Hưng
 * 
 */
void init() {
    ifstream inputFile("input.txt");
    string x;
    string y;
    int z;
    while (inputFile >> x && inputFile >> y && inputFile >> z) {
        if (nodes[x] == NULL) {
            nodes[x] = new Node();
            nodes[x]->name = x;
        }

        if (nodes[y] == NULL) {
            nodes[y] = new Node();
            nodes[y]->name = y;
        }

        nodes[x]->neighbors.push_back(nodes[y]);
        weightage[x][y] = z;
    }
    inputFile.close();
};

/**
 * @brief Lưu weightage và nodes vào file input.txt
 * Hưng
 * 
 */
void saveToFile() {
    ofstream file("input.txt");

    for (auto src : weightage) {
        for (auto dest : src.second) {
            file << src.first << " " << dest.first << " " << dest.second << endl;
        }
    }

    file.close();
};

/**
 * @brief Thêm node
 * Hoàng
 * 
 */
void addNode() {};

/**
 * @brief Sửa node / trọng số
 * Hùng
 * 
 */
void editNode() {};

/**
 * @brief Xóa node
 * Hùng
 * 
 */
void deleteNode() {};

/**
 * @brief Demo thuật toán DFS
 * Hoàng
 * 
 */
void showDFS() {};

/**
 * @brief Demo thuật toán BFS
 * Hưng
 * 
 */
void showBFS() {};

/********************************************************************************************/

/**
 * @brief Demo đường đi ngắn nhất giữa 2 điểm
 * 
 */
void showShortestPath() {};

/**
 * @brief Demo các phần liên thông của đồ thị, show các đỉnh của thành phần liên thông
 * 
 */
void showThanhPhanLienThong() {};

/**
 * @brief Demo chu trình hamilton
 * 
 */
void showHamilton() {

}

/**
 * @brief Demo chu trình Euler
 * 
 */
void showEuler() {

}

/**
 * @brief Demo đỉnh trụ của đồ thị
 * 
 */
void showDinhTru() {};

/**
 * @brief Demo đỉnh thắt của đồ thị
 * 
 */
void showDinhThat() {};

/**
 * @brief Demo cạnh cầu của đồ thị
 * 
 */
void showCanhCau() {};

/**
 * @brief Demo thuật toán topological sort
 * 
 */
void showTopologicalSort() {};

/**
 * @brief Demo bài tô màu đồ thị
 * 
 */
void showGraphColoring() {};

int main() {
    init();
    saveToFile();
    return 0;
}