# Post-Integration: Prerelease action

This action output JIRA issue key and prerelease tag based on Pull Request branch.

## Inputs
|Input|Required|Default|Description|
|---|:---:|---|---|
|`branch`|✅| |Branch name, must contain JIRA issue key|
|`push`|✅|`true`|Push tags if `true`|

## Outputs
|Output|Description|
|------|---|
|`key`|JIRA issue key|
|`tag`|Prerelease tag|

## Example usage

```yaml
uses: sepulsa/prerelease-action@main
with:
  branch: ${{ github.head_ref }}
```
