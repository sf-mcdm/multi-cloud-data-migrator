# Salesforce Multi-Cloud Data Migrator 🚀

The **Salesforce Multi-Cloud Data Migrator** is a powerful and resilient command-line tool for migrating large, complex data volumes between Salesforce orgs.

It's built to handle the intricate data models found in **Revenue Cloud Advanced (`Product Catalog Management, Dynamic Revenue Orchestrator,...`), Revenue Cloud Billing, Digital Insurance, and other Salesforce Clouds**, allowing you to move entire datasets with confidence. Stop worrying about memory limits, manual VLOOKUPs, or losing progress on failed jobs—this tool handles it all.

---

## ✨ Now with a Web UI App!

For a more visual and interactive experience, the Multi-Cloud Data Migrator now includes a full-featured Web UI app, built right into the Salesforce CLI plugin.

## 🆕 What’s New in MCDM?

| Feature                                   | Value Proposition                                                                                                                                           |
| :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Deep Clone Migration Plan (Revolutionary)** | Migrate entire complex data hierarchies starting from a single record ID or SKU, automatically discovering all dependencies.                                |
| **CSV Import/Export**                     | Export data to a local directory for easy versioning, Git integration, and auditing. Import mode respects dependencies defined in your templates.           |
| **Multi-Cloud Configs**                   | Seamlessly switch templates like `Revenue Cloud Advanced`, `Revenue Cloud Billing`, and `Digital Insurance` via the **Salesforce Cloud Template** dropdown. |
| **Ad-Hoc Migrations**                     | Use the **Custom Query** tab to run complex migrations without config files.                                                                                |
| **Resumable LDV Jobs**                    | Large record volumes are resumable with the **Resume Job** button.                                                                                          |
| **Memory-Safe Logging**                   | Smart log truncation prevents memory crashes.                                                                                                               |
| **Live Progress Feedback**                | Real-time CLI progress indicators are displayed in the Log Viewer.                                                                                          |

---

## Key Features

- **↩️ Resumable Jobs:** Never lose your progress. If a migration is interrupted, click the **Resume Job** button to pick up right where it left off.
- **🧩 Complex Relationship Handling:** Flawlessly handles objects linked by multiple fields (composite keys), complex lookups, and deep relationship hierarchies.
- **🌳 Deep Clone Migration Plan (Revolutionary):** This feature provides precise control for migrating complex hierarchies from a single anchor point (Root ID). For Revenue Cloud Advanced products, inputting just the **Product SKU** enables our smart templates to automatically detect, gather, and correctly migrate the entire graph, including all dependencies (Price Rules, Attributes, Billing Policies) and dependents (Child Products, Classifications).
- **📈 High-Volume Performance:** Built with memory safeguards and the efficient Bulk API 2.0, the migrator processes millions of records in manageable chunks without crashing.
- **📝 Declarative & Reusable Plans:** Define your entire migration plan in a simple configuration file. This plan is reusable, version-controllable, and easy for your team to understand.
- **🎯 Flexible for Any Task:** Use a detailed config file for a full-scale migration (**Standard** tab), or use the **Custom Query** tab for a fast data seeding task.

---

## 🚀 Key Features & the Problems They Solve

| Feature                  | UI Input Field                                 | What It Does & Solves                                                                |
| :----------------------- | :--------------------------------------------- | :----------------------------------------------------------------------------------- |
| **Migration Plan**       | View Plan button (Standard mode only)          | Lists each sObject’s key strategy before running to ensure data accuracy.            |
| **Dependency Wizardry**  | Config file driven                             | Drafts parents → inserts children → finalizes parents. Solves circular dependencies. |
| **Composite-Key Safety** | **Custom Query** tab: **Composite Key** field. | Multi-field keys with optional/required fields. Prevents accidental overwrites.      |
| **External-ID Upserts**  | **Custom Query** tab: **External ID** field.   | Uses business keys like `Name`, `Code`. Avoids brittle ID mapping.                   |
| **Active-Row Filter**    | Config file driven                             | Includes only `IsActive=TRUE` or `Status='Active'`. Skips drafts.                    |
| **Pre-built SOQL**       | Config file driven                             | Auto-generated queries with all fields/relationships sorted by dependency.           |
| **Custom-Field Append**  | Filter By: SObjects input.                     | Add fields inline (e.g., `Product2(CustomField1__c)`). Extends migrations easily.    |
| **Extra-WHERE Filter**   | WHERE Clause (Filter) text area.               | Add filters like `CreatedDate > LAST_YEAR`. Targets only desired data.               |
| **Progress Reporting**   | Log Viewer                                     | Live bars for inserts/updates. Improves transparency during migration.               |
| **Insert-Only Mode**     | Config file driven                             | For objects like TaxTreatment that can’t be updated. Prevents rollback errors.       |
| **Rich Skip Reporting**  | Log Viewer output                              | Shows created, updated, skipped counts with reasons. First 10 logged.                |
| **Better Error Context** | Log Viewer output                              | Errors include object/field for faster debugging.                                    |
| **Failure Logging**      | Log Viewer mentions the file                   | Creates `<source>-<target>-failure-*.log`. Centralized diagnostics.                  |
| **Selective Runs**       | Filter By: SObjects input.                     | Use comma-separated list to migrate specific sObjects only.                          |
| **Subset Migrations**    | Start From Object / To End Object dropdowns.   | Executes a partial segment of the overall plan.                                      |

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

- **Authentication:** In the **Connections & Mode** section, select or authorize your source and target orgs by clicking the **Authorize Org** button and completing the OAuth flow.

### 2. Set Migration Mode

Select the desired tab under **Connections & Mode**:

- **Direct (Org-to-Org):** Requires both **Source Org** and **Target Org** to be set.
- **Export to CSV:** Requires **Source Org** and a local **Export Directory Path**.
- **Import from CSV:** Requires **Target Org** and a local **Import Directory Path**.

### 3. Define Migration Plan

Select the plan type under the **Migration Plan** section (Standard, Deep Clone, or Custom Query) and fill out the fields.

---

## Powerful Migration Scenarios & Examples

Below shows how to achieve common CLI scenarios using the UI fields.

### The Full-Scale Migration 🚢

- **Goal:** Migrate a full data set (e.g., Revenue Cloud Advanced) from a backup org to a new sandbox.
- **Action:**
  1.  **Mode:** Select **Direct (Org-to-Org)**.
  2.  **Connections:** Select `my-prod-backup` as the **Source Org** and `my-new-sandbox` as the **Target Org**.
  3.  **Plan:** Select the **Standard** tab.
  4.  **Template:** Select the `Revenue Cloud Advanced` config from the **Salesforce Cloud Template** dropdown.

### The Surgical Strike (Migrating Specific Objects) 🎯

- **Goal:** Only migrate Products and their related Pricebook Entries using the `Revenue Cloud Advanced` template.
- **Action:**
  1.  **Plan:** Select the **Standard** tab.
  2.  **Template:** Select the `Revenue Cloud Advanced` config.
  3.  **Filter:** In the **Filter By: SObjects** input field, enter: `Product2,ProductSellingModelOption,PricebookEntry`.

### The Flexible Query (Adding Custom Fields on the Fly) ✨

- **Goal:** Run the `Revenue Cloud Advanced` template but ensure two custom fields on Product2 are included.
- **Action:**
  1.  **Plan:** Select the **Standard** tab.
  2.  **Filter:** In the **Filter By: SObjects** input field, enter: `Product2(Tier__c,Launch_Region__c),PricebookEntry`.

### The Quick Fix (One-Off Custom Queries) ⚡

- **Goal:** Migrate specific product data using a complex multi-field upsert key.
- **Action:**
  1.  **Plan:** Select the **Custom Query** tab.
  2.  **Query:** Enter your SOQL query in the **SOQL Query** box (e.g., `SELECT Pricebook2.Name, Product2.StockKeepingUnit FROM PricebookEntry`).
  3.  **Object:** Enter the object API name in **SObject API Name** (e.g., `PricebookEntry`).
  4.  **Key:** Select the **Composite Key** radio button. Enter the fields in the text area: `Pricebook2.Name,Product2.StockKeepingUnit`.

### The Time-Bound & Regional Migration (Advanced Filtering) 🗺️

- **Goal:** Migrate only recently modified data using the `Revenue Cloud Advanced` template.
- **Action:**
  1.  **Plan:** Select the **Standard** tab.
  2.  **Template:** Select the `Revenue Cloud Advanced` config.
  3.  **Filter:** In the **WHERE Clause (Filter)** text area, enter: `LastModifiedDate > 2025-09-15T00:00:00Z`.

### The Phased Deployment (Migrating a Range) 🔢

- **Goal:** Run the second phase (pricing objects) of the `Revenue Cloud Advanced` template.
- **Action:**
  1.  **Plan:** Select the **Standard** tab.
  2.  **Template:** Select the `Revenue Cloud Advanced` config.
  3.  **Start:** Select `Pricebook2` from the **Start From Object** dropdown.
  4.  **End:** Select `PricebookEntry` from the **To End Object** dropdown.

### The Revolution (Deep Clone Migration Plan) 🌳

- **Goal:** Migrate an entire complex product structure (e.g., a Revenue Cloud Advanced bundle) starting only from its SKU.
- **Action:**
  1.  **Mode:** Select **Direct (Org-to-Org)** or **Export to CSV**.
  2.  **Plan:** Select the **Deep Clone Migration Plan** tab.
  3.  **Template:** Select the required Deep Clone Migration Plan (e.g., for Revenue Cloud Advanced Products).
  4.  **Input:** Enter the **Root SKU** in the input field.

### Export Data to CSV Locally 💾

- **Goal:** Extract a data set defined by a template or plan and save it to a local folder.
- **Action:**
  1.  **Mode:** Select **Export to CSV**.
  2.  **Connections:** Select the **Source Org**.
  3.  **Path:** Use the **Select...** button next to **Export Directory Path** to choose the output folder.
  4.  **Plan:** Configure the desired plan (**Standard**, **Deep Clone**, or **Custom Query**) to define _which_ records to export.

### Import Data from CSV into Org 📤

- **Goal:** Load records from a locally exported CSV directory into the Target Org.
- **Action:**
  1.  **Mode:** Select **Import from CSV**.
  2.  **Connections:** Select the **Target Org**. (Source Org will be disabled).
  3.  **Path:** Use the **Select...** button next to **Import Directory Path** to choose the folder containing the CSV files.
  4.  **Plan:** Select the **Salesforce Cloud Template** or **Deep Clone** template used during the original export to ensure correct dependency order.

### 🔁 Resume a Failed Large Job

If your last job failed or was interrupted, you don't need to reconfigure anything. The tool automatically saves the state. Simply click the **Resume Job** button.

---

## Configuration Concepts

The power of the migrator comes from its configuration file. This file defines the objects to migrate, their dependencies, queries, and relationship mappings. The order is crucial: dependencies must be migrated before the objects that rely on them.

---

## License Management

Access the **Setup** tab to check your license status or find contact information for extensions.

## Copyright

© 2025 LOUDRASSI Ahmed
