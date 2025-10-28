# Salesforce Multi-Cloud Data Migrator 🚀

The **Salesforce Multi-Cloud Data Migrator** is a powerful and resilient command-line tool for migrating large, complex data volumes between Salesforce orgs.

It's built to handle the intricate data models found in **Revenue Cloud Advanced (`Product Catalog Management, Dynamic Revenue Orchestrator,...`), Revenue Cloud Billing, Digital Insurance, and other Salesforce Clouds**, allowing you to move entire datasets with confidence. Stop worrying about memory limits, manual LOOKUPs, or losing progress on failed jobs—this tool handles it all.

> ### ⚠️ Important: Data Quality Disclaimer
>
> Before starting **any** migration, it is critical to ensure your data is clean and properly prepared.
>
> - **Check Your Keys:** Use the **View Plan** button to review the migration strategy.
> - **Ensure Uniqueness:** Verify that all Key fields and composite key combinations are populated and **unique** in the source data.
> - **Validate Data:** Duplicate or missing keys will cause records to be skipped or linked incorrectly. The migration **will not run as expected** if the underlying data quality is poor.

---

## 🆕 What’s New in MCDM?

| Feature                                       | Value Proposition                                                                                                                                                                                             |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Custom Migration Plan Builder**             | Visually build, edit, and manage your own complex migration migration plans. Supports **importing** and **exporting** migration plans as `.js` files for easy sharing and version control.                    |
| **Advanced Configurator (Deep Clone)**        | The **Deep Clone Migration Plan** tab now supports **The Salesforce Advanced Configurator-CML**. Just select the **advanced-configurator-cml** and provide the **Cosntraint Model(Expression Set) API Name**. |
| **Deep Clone Migration Plan (Revolutionary)** | Migrate entire complex data hierarchies starting from a single record SKU, automatically discovering all dependencies.                                                                                        |
| **CSV Import/Export**                         | Export data to a local directory for easy versioning, Git integration, and auditing. Import mode respects dependencies defined in your migration plans.                                                       |
| **Multi-Cloud Configs**                       | Seamlessly switch migration plans like `Revenue Cloud Advanced`, `Revenue Cloud Billing`, and `Digital Insurance` via the **Standard Migration Plan** dropdown.                                               |
| **Ad-Hoc Migrations**                         | Use the **Custom Query** tab to run complex migrations without config files.                                                                                                                                  |
| **Resumable LDV Jobs**                        | Large record volumes are resumable with the **Resume Job** button.                                                                                                                                            |
| **Memory-Safe Logging**                       | Smart log truncation prevents memory crashes.                                                                                                                                                                 |
| **Live Progress Feedback**                    | Real-time CLI progress indicators are displayed in the Log Viewer.                                                                                                                                            |

---

## Key Features

- **↩️ Resumable Jobs:** Never lose your progress. If a migration is interrupted, click the **Resume Job** button to pick up right where it left off.
- **🧩 Complex Relationship Handling:** Flawlessly handles objects linked by multiple fields (composite keys), complex lookups, and deep relationship hierarchies.
- **🌳 Deep Clone Migration Plan (Revolutionary):** This feature provides precise control for migrating complex hierarchies from a single anchor point (Root ID). For Revenue Cloud Advanced products, inputting just the **Product SKU** enables our smart migration plans to automatically detect, gather, and correctly migrate the entire graph, including all dependencies (Price Rules, Attributes, Billing Policies) and dependents (Child Products, Classifications).
- **📈 High-Volume Performance:** Built with memory safeguards and the efficient Bulk API 2.0, the migrator processes millions of records in manageable chunks without crashing.
- **📝 Declarative & Reusable Plans:** Define your entire migration plan in a simple configuration file. This plan is reusable, version-controllable, and easy for your team to understand.
- **🎯 Flexible for Any Task:** Use a detailed config file for a full-scale migration (**Standard Migration Plans** tab), create your own (**Custom Migration Plans** tab), or use the **Custom Query** tab for a fast data seeding task.

---

## 🚀 Key Features & the Problems They Solve

| Feature                          | UI Input Field                                                                                                                                        | What It Does & Solves                                                                                                                                                                                                                                                                                                                  |
| :------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Migration Plan**               | View Plan button (Standard/Custom modes)                                                                                                              | Lists each sObject’s key strategy before running to ensure data accuracy.                                                                                                                                                                                                                                                              |
| **Dependency Wizardry**          | Config file driven                                                                                                                                    | Drafts parents → inserts children → finalizes parents. Solves circular dependencies.                                                                                                                                                                                                                                                   |
| **Composite-Key Safety**         | **Custom Query** tab: **Composite Key** field.                                                                                                        | Multi-field keys with optional/required fields. Prevents accidental overwrites.                                                                                                                                                                                                                                                        |
| **External-ID Upserts**          | **Custom Query** tab: **External ID** field.                                                                                                          | Uses business keys like `Name`, `Code`. Avoids brittle ID mapping.                                                                                                                                                                                                                                                                     |
| **Active-Row Filter**            | Config file driven                                                                                                                                    | Includes only `IsActive=TRUE` or `Status='Active'`. Skips drafts.                                                                                                                                                                                                                                                                      |
| **Pre-built SOQL**               | Config file driven                                                                                                                                    | Auto-generated queries with all fields/relationships sorted by dependency.                                                                                                                                                                                                                                                             |
| **Custom-Field Append (New UI)** | **(New)** The "Add Custom Fields" column in the SObjects table.<br />**(Old)** ~~Filter By: SObjects input.~~                                         | **(New Way)**: In the SObjects table, find your SObject row (e.g., `Product2`) and type your fields in the "Add Custom Fields" cell (e.g., `Tier__c, Launch_Region__c`).<br />**(Old/Deprecated)**: Appending via `Filter By: SObjects(CustomField1__c)` is no longer supported.                                                       |
| **Extra-WHERE Filter (New UI)**  | **(New)** The "Append WHERE Clause" column in the SObjects table (Standard Migration Plans only).<br />**(Old)** ~~WHERE Clause (Filter) text area.~~ | **(New Way)**: In the SObjects table, find your SObject row and type your filter in the "Append WHERE Clause" cell (e.g., `LastModifiedDate > 2025-09-15T00:00:00Z`). This is only available for the **Standard Migration Plans** tab.<br />**(Old/Deprecated)**: The global `WHERE Clause (Filter)` text area is no longer available. |
| **Progress Reporting**           | Log Viewer                                                                                                                                            | Live bars for inserts/updates. Improves transparency during migration.                                                                                                                                                                                                                                                                 |
| **Insert-Only Mode**             | Config file driven                                                                                                                                    | For objects like TaxTreatment that can’t be updated. Prevents rollback errors.                                                                                                                                                                                                                                                         |
| **Rich Skip Reporting**          | Log Viewer output                                                                                                                                     | Shows created, updated, skipped counts with reasons. First 10 logged.                                                                                                                                                                                                                                                                  |
| **Better Error Context**         | Log Viewer output                                                                                                                                     | Errors include object/field for faster debugging.                                                                                                                                                                                                                                                                                      |
| **Failure Logging**              | Log Viewer mentions the file                                                                                                                          | Creates `<source>-<target>-failure-*.log`. Centralized diagnostics.                                                                                                                                                                                                                                                                    |
| **Selective Runs (New UI)**      | **(New)** Uncheck "Execute the full plan?" and use the SObject table checkboxes.<br />**(Old)** ~~Filter By: SObjects input.~~                        | **(New Way)**: Uncheck the "Execute the full plan?" box. Then, use the checkboxes in the SObject table to select only the specific SObjects you want to migrate.<br />**(Old/Deprecated)**: Using a comma-separated list in `Filter By: SObjects` is no longer supported.                                                              |

---

## UI Configuration Flow

### 1. Installation & Authentication

**Prerequisite** Follow the official Salesforce guide: [**Salesforce CLI Setup**](https://developer.salesforce.com/tools/salesforcecli)

**Multi Cloud Data Migration Installation ⬇️**

```bash
sf plugins install sf-mcdm/multi-cloud-data-migrator
```

**Launch the Web App 🚀**

```bash
sf multi-cloud-data-migrator:ui
```

### 2. Set Migration Mode

Select the desired tab under **Connections & Mode**:

- **Direct (Org-to-Org):** Requires both **Source Org** and **Target Org** to be set.
- **Export to CSV:** Requires **Source Org** and a local **Export Directory Path** (use the "Select..." button).
- **Import from CSV:** Requires **Target Org** and a local **Import Directory Path** (use the "Select..." button).

### 3. Define Migration Plan

Select the plan type under the **Migration Plan** section (**Standard Migration Plans**, **Custom Migration Plans**, **Deep Clone**, or **Custom Query**) and fill out the fields.

---

## 🆕 Custom Migration Plan Builder

The **Custom Migration Plan Builder** (accessed via its own main tab) empowers you to create and manage your own reusable migration plans without manually editing `.js` files.

- **Visual Editor:** Add/remove migration steps, define sObjects, SOQL queries, upsert keys (External ID or Composite), and field overrides in a clear, step-by-step interface.
- **Load & Edit:** Load any existing custom migration plan to modify or review it.
- **Export:** Download any of your custom migration plans as a `.js` file. This is perfect for backing up your work or sharing a specific migration plan with a colleague.
- **Import:** Upload a valid `.js` migration plan file from your computer to add it to your list of Custom Migration Plans.

Once saved, your new migration plan becomes available in the **Custom Migration Plans** tab on the main configuration page.

---

## Powerful Migration Scenarios & Examples (UI Mapping)

Below shows how to achieve common CLI scenarios using the UI fields.

### The Full-Scale Migration 🚢

**Goal:** Migrate a full data set (e.g., Revenue Cloud Advanced) from a backup org to a new sandbox.

- **Mode:** Select **Direct (Org-to-Org)**.
- **Connections:** Select `my-prod-backup` as the **Source Org** and `my-new-sandbox` as the **Target Org**.
- **Plan:** Select the **Standard Migration Plans** tab.
- **Migration Plan:** Select the `Revenue Cloud Advanced` config from the **Standard Migration Plan** dropdown.

### The Surgical s (Migrating Specific Objects) 🎯

**Goal:** Only migrate Products and their related Pricebook Entries using the `Revenue Cloud Advanced` migration plan and the SObject selection checkboxes.

- **Plan:** Select the **Standard Migration Plans** tab.
- **Migration Plan:** Select the `Revenue Cloud Advanced` config.
- **Select Objects:** Uncheck the **"Execute the full plan?"** checkbox.
- **Filter:** In the SObject table, check the boxes only for: `Product2`, `ProductSellingModelOption`, and `PricebookEntry`.

### The Flexible Query (Adding Custom Fields on the Fly) ✨

**Goal:** Run the `Revenue Cloud Advanced` migration plan but ensure two custom fields on Product2 are included using the new SObject table.

- **Plan:** Select the **Standard Migration Plans** tab.
- **Migration Plan:** Select the `Revenue Cloud Advanced` config.
- **SObject Table:** In the SObjects table that appears, find the **Product2** row.
- **Add Fields:** In that row, enter `Tier__c, Launch_Region__c` into the "Add Custom Fields" cell.

### The Quick Fix (One-Off Custom Queries) ⚡

**Goal:** Migrate specific product data using a complex multi-field upsert key.

- **Plan:** Select the **Custom Query** tab.
- **Query:** Enter your SOQL query in the **SOQL Query** box (e.g., `SELECT Pricebook2.Name, Product2.StockKeepingUnit FROM PricebookEntry`).
- **Object:** Enter the object API name in **SObject API Name** (e.g., `PricebookEntry`).
- **Key:** Select the **Composite Key** radio button. Enter the fields in the text area: `Pricebook2.Name,Product2.StockKeepingUnit`.

### The Time-Bound & Regional Migration (Advanced Filtering) 🗺️

**Goal:** Migrate only recently modified data using the `Revenue Cloud Advanced` migration plan's per-SObject WHERE clause.

- **Plan:** Select the **Standard Migration Plans** tab.
- **Migration Plan:** Select the `Revenue Cloud Advanced` config.
- **SObject Table:** In the SObjects table, find the SObject you want to filter (e.g., **Account**).
- **Add Filter:** In that row, enter `LastModifiedDate > 2025-09-15T00:00:00Z` into the "Append WHERE Clause" cell.

### The Revolution (Deep Clone Migration Plan) 🌳

**Goal:** Migrate an entire complex product structure (e.g., a Revenue Cloud Advanced bundle) starting only from its SKU.

- **Mode:** Select **Direct (Org-to-Org)** or **Export to CSV**.
- **Plan:** Select the **Deep Clone Migration Plan** tab.
- **Migration Plan:** Select the **Deep Clone** migration plan (e.g., for Revenue Cloud Advanced Products) from the dropdown. This Migration Plan dictates the hierarchy.
- **Input:** Enter the **Root SKU** in the input field.
  The tool uses the provided input as the anchor, finds all related configuration data (Price Rules, Attributes, etc.), and migrates them in the correct dependency order.

### Export Data to CSV Locally 💾

**Goal:** Extract a data set defined by a migration plan or plan and save it to a local folder.

- **Mode:** Select **Export to CSV**.
- **Connections:** Select the **Source Org**.
- **Path:** Use the **Select...** button next to **Export Directory Path** to choose the output folder.
- **Plan:** Configure the desired plan (**Standard Migration Plans**, **Custom Migration Plans**, **Deep Clone**, or **Custom Query**) to define _which_ records to export.

### Import Data from CSV into Org 📤

**Goal:** Load records from a locally exported CSV directory into the Target Org.

- **Mode:** Select **Import from CSV**.
- **Connections:** Select the **Target Org**. (Source Org will be disabled).
- **Path:** Use the **Select...** button next to **Import Directory Path** to choose the folder containing the CSV files.
- **Plan:** Select the **Standard Migration Plan**, **Custom Migration Plan**, or **Deep Clone Migration Plan** migration plan used during the original export to ensure correct dependency order.

### 🔁 Resume a Failed Large Job

If your last job failed or was interrupted, you don't need to reconfigure anything. The tool automatically saves the state.
**Action:** Simply click the **Resume Job** button.

---

## Migration Plan Concepts

The power of the migrator comes from its Migration Plan file. This file defines the objects to migrate, their dependencies, queries, and relationship mappings. The order is crucial: dependencies must be migrated before the objects that rely on them.

---

## License Management

Access the **Setup** tab to check your license status or find contact information for extensions.

---

Copyright © 2025 LOUDRASSI Ahmed
