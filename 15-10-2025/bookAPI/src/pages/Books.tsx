import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispathStore, RootState } from "../store/store";
import { fetchAllBooksMethod } from "../features/bookSlice";
import { Alert, Container, Spinner, Table, Form } from "react-bootstrap";
import BookList from "../commons/componets/BookList";
import useDecodeToken from "../hooks/useDecodeToken";
import type { bookType } from "../commons/types/bookType";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Books: React.FC = () => {
    const { items, error, loading } = useSelector(
        (state: RootState) => state.BookStore
    );
    const dispatch = useDispatch<AppDispathStore>();
    const role = useDecodeToken();

    const [sortConfig, setSortingConfig] = useState<{ key: keyof bookType; direction: "asc" | "desc"; } | null>(null);

    const [filters, setFilters] = useState({
        bookId: "",
        author: "",
        title: "",
        price: "",
        stock: "",
    });

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchAllBooksMethod());
        }
    }, [items.length, dispatch]);

    const filteredAndSortedData = useMemo(() => {
        let filtered = items.filter((book) => {
            const matchesBookId =
                filters.bookId === "" ||
                String(book.bookId).toLowerCase().includes(filters.bookId.toLowerCase());

            const matchesAuthor =
                filters.author === "" ||
                book.author.toLowerCase().includes(filters.author.toLowerCase());

            const matchesTitle =
                filters.title === "" ||
                book.title.toLowerCase().includes(filters.title.toLowerCase());

            const matchesPrice =
                filters.price === "" ||
                String(book.price).toLowerCase().includes(filters.price.toLowerCase());

            const matchesStock =
                filters.stock === "" ||
                String(book.stock).toLowerCase().includes(filters.stock.toLowerCase());

            return (
                matchesBookId &&
                matchesAuthor &&
                matchesTitle &&
                matchesPrice &&
                matchesStock
            );
        });

        if (sortConfig !== null) {
            filtered = [...filtered].sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                const { direction } = sortConfig;

                if (typeof aValue === "string" && typeof bValue === "string") {
                    const dateA = Date.parse(aValue);
                    const dateB = Date.parse(bValue);

                    if (!isNaN(dateA) && !isNaN(dateB)) {
                        return direction === "asc" ? dateA - dateB : dateB - dateA;
                    }

                    return direction === "asc"
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                if (typeof aValue === "number" && typeof bValue === "number") {
                    return direction === "asc" ? aValue - bValue : bValue - aValue;
                }

                // if (typeof aValue === "string" && typeof bValue === "string") {
                //     return direction === "asc"
                //         ? aValue.localeCompare(bValue)
                //         : bValue.localeCompare(aValue);
                // }


                // if (aValue instanceof Date && bValue instanceof Date) {
                //     return direction === "asc"
                //         ? aValue.getTime() - bValue.getTime()
                //         : bValue.getTime() - aValue.getTime();
                // }

                return 0;
            });
        }

        return filtered;
    }, [items, filters, sortConfig]);

    const handleSort = (key: keyof bookType) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig?.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortingConfig({ key, direction });
    };

    const renderSortIcon = (key: keyof bookType) => {
        if (sortConfig?.key === key) {
            return sortConfig.direction === "asc" ? (
                <FaArrowUp className="ms-1 text-success fw-bold" />
            ) : (
                <FaArrowDown className="ms-1 text-danger fw-bold" />
            );
        }
        return <FaArrowUp className="ms-1 text-secondary opacity-50" />;
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="success" />
            </div>
        );
    }

    if (error) {
        return (
            <Container className="text-center my-5">
                <Alert variant="danger">Error: {error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-4">
            <h3 className="text-center fw-bold mb-4">Our Books</h3>

            <button
                className="btn btn-outline-danger btn-sm fw-semibold mb-2"
                onClick={() => {
                    setFilters({
                        bookId: "",
                        author: "",
                        title: "",
                        price: "",
                        stock: "",
                    });
                    setSortingConfig(null);
                }}
            >
                Clear All
            </button>

            <Table className="table table-bordered table-striped table-hover align-middle text-center shadow-sm rounded p-1">
                <thead className="table-light">
                    <tr>
                        <th onClick={() => handleSort("bookId")} style={{ cursor: "pointer" }}>
                            Id {renderSortIcon("bookId")}
                        </th>
                        <th onClick={() => handleSort("author")} style={{ cursor: "pointer" }}>
                            Author {renderSortIcon("author")}
                        </th>
                        <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                            Title {renderSortIcon("title")}
                        </th>
                        <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>
                            Price {renderSortIcon("price")}
                        </th>
                        <th onClick={() => handleSort("stock")} style={{ cursor: "pointer" }}>
                            Stock {renderSortIcon("stock")}
                        </th>
                        {role === "Admin" && <th>Actions</th>}
                    </tr>

                    <tr>
                        <th>
                            <Form.Control
                                size="sm"
                                placeholder="Search Id"
                                value={filters.bookId}
                                onChange={(e) =>
                                    setFilters({ ...filters, bookId: e.target.value })
                                }
                            />
                        </th>
                        <th>
                            <Form.Control
                                size="sm"
                                placeholder="Search Author"
                                value={filters.author}
                                onChange={(e) =>
                                    setFilters({ ...filters, author: e.target.value })
                                }
                            />
                        </th>
                        <th>
                            <Form.Control
                                size="sm"
                                placeholder="Search Title"
                                value={filters.title}
                                onChange={(e) =>
                                    setFilters({ ...filters, title: e.target.value })
                                }
                            />
                        </th>
                        <th>
                            <Form.Control
                                size="sm"
                                placeholder="Search Price"
                                value={filters.price}
                                onChange={(e) =>
                                    setFilters({ ...filters, price: e.target.value })
                                }
                            />
                        </th>
                        <th>
                            <Form.Control
                                size="sm"
                                placeholder="Search Stock"
                                value={filters.stock}
                                onChange={(e) =>
                                    setFilters({ ...filters, stock: e.target.value })
                                }
                            />
                        </th>
                        {role === "Admin" && <th></th>}
                    </tr>
                </thead>

                <tbody>
                    {filteredAndSortedData.map((book) => (
                        <BookList key={book.bookId} book={book} />
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default React.memo(Books);
