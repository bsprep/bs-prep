# Database Management Systems: most repeated PYQ topics

IIT Madras BS · Diploma level · 128 past questions from 7 papers, sorted into 12 topics.

Practise these papers in a timed exam portal with the official answer key: **[Database Management Systems PYQs on BTechi](https://www.btechi.in/pyqs/diploma/database-management-systems)**. Printable sheets (save as PDF): [all Database Management Systems question sheets](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets), [most repeated questions](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/most-repeated).

## Topics, most asked first

| # | Topic | Questions | Share | What they ask |
|---|---|---|---|---|
| 1 | [SQL queries & their output](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-sql-queries) | 16 | 13% | Read or pick SQL queries: joins, subqueries, EXISTS/EXCEPT, GROUP BY/HAVING, LIKE and query results |
| 2 | [Recovery, logs & backup](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-recovery-and-backup) | 15 | 12% | Log-based recovery with checkpoints, undo/redo decisions, values on disk and backup set counts |
| 3 | [Storage: disks, RAID & buffers](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-storage-disks-and-buffers) | 13 | 10% | Disk transfer rate, read time and capacity, RAID efficiency, page replacement and file organisation |
| 4 | [B+ trees, BSTs & multilevel index](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-b-plus-trees-and-search-trees) | 13 | 10% | B+ tree order, keys per node, node splits, search cost, multilevel index blocks and BST shape |
| 5 | [Relational model & relational algebra](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-relational-model-and-algebra) | 12 | 9% | Schema levels, RA/TRC/DRC expressions, joins, division and equivalent algebra expressions |
| 6 | [SQL DDL, constraints & app development](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-sql-ddl-constraints-app-dev) | 12 | 9% | CREATE TABLE checks, foreign keys and cascades, views, GRANT, Python DB access and SQL injection |
| 7 | [Transactions & serializability](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-transactions-and-serializability) | 11 | 9% | Conflict/view serializability, precedence graphs, equivalent schedules and two-phase locking |
| 8 | [Functional dependencies & keys](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-functional-dependencies-and-keys) | 10 | 8% | FDs from a table instance, closures, canonical cover and counting super keys |
| 9 | [Normal forms & decomposition](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-normalization-and-decomposition) | 8 | 6% | Lossless join, dependency preservation, 2NF/3NF/BCNF checks and multivalued dependencies |
| 10 | [Hashing & bitmap indices](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-hashing-and-bitmap-indices) | 7 | 5% | Static vs dynamic hashing, collision-free hash functions, extendable hashing and bitmap indices |
| 11 | [Entity-relationship model](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-er-model) | 6 | 5% | Read ER diagrams for cardinality and participation, and map them to relational schemas |
| 12 | [Query processing & join cost](https://www.btechi.in/pyqs/diploma/database-management-systems/sheets/topic-query-processing) | 5 | 4% | Block nested-loop join cost: block transfers, seeks and size of the inner relation |

## Question types that come back

These questions are solved with the same steps, in different papers. Learn the method once.

| Question type | Papers | Asked in |
|---|---|---|
| Count backup sets to load for full recovery from a backup schedule | 5 | End Term Dec 2024 (AN), End Term Dec 2024 (FN), End Term Apr 2025 (AN), End Term Apr 2025 (FN), End Term Aug 2025 (FN) |
| Pick FDs that hold in a given relation instance | 5 | End Term Dec 2024 (AN), End Term Dec 2024 (FN), End Term Apr 2025 (AN), End Term Apr 2025 (FN), End Term Aug 2025 (FN) |
| Read cardinality and participation statements from an ER diagram | 5 | End Term Dec 2024 (FN), End Term Apr 2025 (AN), End Term Apr 2025 (FN), End Term Aug 2025 (FN), Quiz 1 Oct 2025 (AN) |
| Find values of data items on disk after a crash from given log records | 4 | End Term Dec 2024 (AN), End Term Dec 2024 (FN), End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Find inner relation blocks from block nested-loop join cost | 4 | End Term Dec 2024 (AN), End Term Dec 2024 (FN), End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Check lossless join, dependency preservation and NF of a decomposition | 4 | End Term Dec 2024 (AN), End Term Dec 2024 (FN), Quiz 2 Aug 2025 (AN), End Term Aug 2025 (FN) |
| Pick RA/TRC/DRC expressions for an English query on a given schema | 4 | End Term Dec 2024 (AN), End Term Dec 2024 (FN), End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Decide undo/redo/ignore for transactions around a checkpoint and failure | 3 | End Term Dec 2024 (AN), End Term Dec 2024 (FN), End Term Aug 2025 (FN) |
| Check conflict serializability and 2PL-lockability of a schedule | 3 | End Term Apr 2025 (AN), End Term Apr 2025 (FN), End Term Aug 2025 (FN) |
| Count conflict-equivalent serial schedules of a given schedule | 3 | End Term Apr 2025 (AN), End Term Apr 2025 (FN), End Term Aug 2025 (FN) |
| Count the super keys of a relation from its FD set | 3 | End Term Apr 2025 (AN), End Term Apr 2025 (FN), Quiz 2 Aug 2025 (AN) |
| Pick relational algebra expressions equivalent to a project-select-join | 3 | End Term Dec 2024 (AN), End Term Dec 2024 (FN), End Term Aug 2025 (FN) |
| Count page faults for a buffer replacement policy (LRU/MRU) | 3 | End Term Apr 2025 (AN), End Term Apr 2025 (FN), Quiz 2 Aug 2025 (AN) |
| Max and min number of keys in the root of a B+ tree of order n | 3 | End Term Dec 2024 (AN), End Term Dec 2024 (FN), End Term Aug 2025 (FN) |
| Check conflict and view serializability of a schedule | 2 | End Term Dec 2024 (AN), End Term Dec 2024 (FN) |
| Check if two schedules S1 and S2 are conflict/view equivalent | 2 | End Term Dec 2024 (AN), End Term Dec 2024 (FN) |
| Find tuples that must exist given a multivalued dependency | 2 | Quiz 2 Aug 2025 (AN), End Term Aug 2025 (FN) |
| Pick RA expressions for IT employees earning above 70,000 | 2 | End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Find students who took no course from a given department in SQL | 2 | End Term Dec 2024 (AN), End Term Dec 2024 (FN) |
| Choose SQL with GROUP BY/HAVING to find categories by product price | 2 | End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Match SQL queries (LIKE, GROUP BY, JOIN) to English questions | 2 | End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Find the INSERT that violates CREATE TABLE constraints | 2 | End Term Dec 2024 (AN), End Term Dec 2024 (FN) |
| Count rows in insurance and nominee tables after a DELETE | 2 | End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Find nominee table contents after INSERTs with foreign keys | 2 | End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Find the column a bitmap index is built on | 2 | End Term Dec 2024 (AN), End Term Dec 2024 (FN) |
| Compute storage efficiency of RAID-1 and RAID-4 | 2 | End Term Dec 2024 (AN), End Term Dec 2024 (FN) |
| Compute disk transfer rate from RPM, sectors and sector size | 2 | End Term Dec 2024 (AN), End Term Dec 2024 (FN) |
| Time to read a file stored in non-consecutive disk sectors | 2 | End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Count node splits when inserting keys into a B+ tree of order 3 | 2 | End Term Dec 2024 (AN), End Term Dec 2024 (FN) |
| Number of blocks at each level of a multilevel index | 2 | End Term Dec 2024 (AN), End Term Dec 2024 (FN) |
| Best B+ tree order from key size, pointer size and block size | 2 | End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Statements on static vs dynamic hashing | 2 | End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Pick hash functions that give unique values for given keys | 2 | End Term Apr 2025 (AN), End Term Apr 2025 (FN) |
| Build a BST from an insert order and answer questions about it | 2 | Quiz 2 Aug 2025 (AN), End Term Aug 2025 (FN) |

## How this was made

Every question in the past papers on BTechi was tagged with exactly one topic. "Questions" counts tagged questions; one paper can have several questions on a topic. Counts cover only the papers on BTechi, not every paper IIT Madras has set, so use them as a guide, not a promise of what will come.

---

[All courses](../README.md) · From [BTechi](https://www.btechi.in), a free, independent study site for the IIT Madras BS. Not affiliated with IIT Madras. Found a mistake? [Open an issue](https://github.com/Btechi/iitm-bs-pyq-topics/issues).
