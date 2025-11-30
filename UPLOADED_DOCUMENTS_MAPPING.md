# Uploaded Documents Mapping

## Documents Uploaded to S3 (November 30, 2025)

### One-Pagers (2)

1. **Compliance Maturity Model**
   - File: `OnePager_Compliance_Maturity_Model.pdf`
   - CDN URL: `https://files.manuscdn.com/user_upload_by_module/session_file/89620106/tGqdIlCKfYEvzXJO.pdf`
   - **NEW DOCUMENT** - Needs to be added to website

2. **Current Compliance Landscape**
   - File: `OnePager_Current_Compliance_Landscape.pdf`
   - CDN URL: `https://files.manuscdn.com/user_upload_by_module/session_file/89620106/fzAbbkwnViWtVLiD.pdf`
   - **NEW DOCUMENT** - Needs to be added to website

### Service Documents (8)

3. **Buy American**
   - File: `Service_Buy_American(1).pdf`
   - CDN URL: `https://files.manuscdn.com/user_upload_by_module/session_file/89620106/rsPBBfYhWxhxCHZl.pdf`
   - Maps to: `serviceDownloads["buy-american-service"]`

4. **Conflict Minerals**
   - File: `Service_Conflict_Minerals(1).pdf`
   - CDN URL: `https://files.manuscdn.com/user_upload_by_module/session_file/89620106/qRefSgZnoRMJDbvJ.pdf`
   - Maps to: `serviceDownloads["conflict-minerals-service"]`

5. **Environmental COI**
   - File: `Service_Environmental_COI(1).pdf`
   - CDN URL: `https://files.manuscdn.com/user_upload_by_module/session_file/89620106/IIgUTiwNsbmMbULJ.pdf`
   - Maps to: `serviceDownloads["environmental-service"]`

6. **Export Control**
   - File: `Service_Export_Control(1).pdf`
   - CDN URL: `https://files.manuscdn.com/user_upload_by_module/session_file/89620106/RQXFbnBJTeZksAVU.pdf`
   - Maps to: `serviceDownloads["export-control"]`

7. **Quality Systems**
   - File: `Service_Quality_Systems(1).pdf`
   - CDN URL: `https://files.manuscdn.com/user_upload_by_module/session_file/89620106/CBjsNyACfPafkSVT.pdf`
   - Maps to: `serviceDownloads["quality-systems-service"]`

8. **Reps & Certs**
   - File: `Service_Reps_Certs(1).pdf`
   - CDN URL: `https://files.manuscdn.com/user_upload_by_module/session_file/89620106/uUdaxEZihzIGXfpV.pdf`
   - Maps to: `serviceDownloads["reps-certs-service"]`

9. **Small Business**
   - File: `Service_Small_Business(1).pdf`
   - CDN URL: `https://files.manuscdn.com/user_upload_by_module/session_file/89620106/YYNGmfUtKqXLwVUx.pdf`
   - Maps to: `serviceDownloads["small-business-service"]`

10. **Supplier Risk**
    - File: `Service_Supplier_Risk(1).pdf`
    - CDN URL: `https://files.manuscdn.com/user_upload_by_module/session_file/89620106/YXSbuxoixWhTfFCj.pdf`
    - Maps to: `serviceDownloads["supplier-risk-service"]`

## Next Steps

1. Update `downloadMappings.ts` with new CDN URLs for existing service documents
2. Add two new one-pager entries for Compliance Maturity Model and Current Compliance Landscape
3. Determine where on the website these two new one-pagers should be displayed
4. Test all download links

## Notes

- All files successfully converted from DOCX to PDF
- All files uploaded to Manus CDN (S3-backed)
- Files are publicly accessible via CDN URLs
- Email capture modal will be triggered before downloads (per existing gating configuration)
